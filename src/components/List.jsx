// Importation des hooks nécessaires, du spinner et du hook personnalisé usePhotos
import { useState, useEffect, useRef } from "react"
import spinner from "../assets/spinner.svg"
import usePhotos from "../hooks/usePhotos"

// Définition du composant List
export default function List() {
  // Définition des états pour la requête et le numéro de page
  const [query, setQuery] = useState("random")
  const [pageNumber, setPageNumber] = useState(1)
  // Définition des références pour la dernière photo et le champ de recherche
  const lastPicRef = useRef() //7 - ref pour la dernière photo
  const searchRef = useRef() //8 - ref pour le champ de recherche

  // Utilisation du hook personnalisé usePhotos pour récupérer les photos
  const photosApiData = usePhotos(query, pageNumber)

  // 7- useEffect pour observer la dernière photo et charger plus de photos lorsque l'utilisateur atteint la fin de la liste
 // Ce hook useEffect est exécuté chaque fois que les données de l'API de photos changent.
useEffect(() => {
  // Vérifie si la référence à la dernière image est définie
  if (lastPicRef.current) {
    // Crée un nouvel observateur d'intersection
    const observer = new IntersectionObserver(([entry]) => {
      // Vérifie si l'élément observé (la dernière image) est dans le viewport (intersecting)
      // et si le nombre de pages actuel est différent du nombre maximum de pages
      if (entry.isIntersecting && photosApiData.maxPages !== pageNumber) {
        // Si c'est le cas, incrémente le numéro de page pour charger plus d'images
        setPageNumber(pageNumber + 1)
        // Réinitialise la référence à la dernière image
        lastPicRef.current = null
        // Déconnecte l'observateur
        observer.disconnect()
      }
    })

    // Commence à observer la dernière image
    observer.observe(lastPicRef.current)
  }
}, [photosApiData]) // Dépendance du hook useEffect
/**
 * L'API Intersection Observer permet de savoir quand un élément spécifique (dans ce cas, la dernière image de la liste) entre dans le viewport. Lorsque cela se produit, le code incrémente le numéro de page, ce qui déclenche une nouvelle requête à l'API pour charger plus d'images. Ensuite, il réinitialise la référence à la dernière image et déconnecte l'observateur.
 */

  // Fonction pour gérer la soumission du formulaire de recherche
  function handleSubmit(e) {
    e.preventDefault()
    if (searchRef.current.value !== query) {
      setQuery(searchRef.current.value)
      setPageNumber(1)
    }
  }

  // Rendu du composant
  return (
    <>
      <h1 className="text-4xl">Unsplash Clone.</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4" htmlFor="search">
          Look for images...
        </label>
        <input
          ref={searchRef}
          placeholder="Look for something..."
          className="block w-full mb-14 text-slate-800 py-3 px-2 text-md outline-gray-500 rounded border border-slate-400"
          type="text"
        />
      </form>
      {/* Affichage de l'erreur si elle existe */}
      {photosApiData.error.state && <p>{photosApiData.error.msg}</p>}

      {/* Affichage d'un message si aucune image n'est disponible pour la requête */}
      {photosApiData.photos.length === 0 &&
        !photosApiData.error.state &&
        !photosApiData.loading && <p>No image available for this query</p>}

      {/* Affichage des photos */}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] auto-rows-[175px] gap-4 justify-center">
        {!photosApiData.loader &&
          photosApiData.photos.length !== 0 &&
          photosApiData.photos.map((photo, index) => {
            if (photosApiData.photos.length === index + 1) { // Si c'est la dernière image, on initialise la référence à la dernière image
              return (
                <li ref={lastPicRef} key={photo.id}>
                  <img
                    className="w-full h-full object-cover"
                    src={photo.urls.regular}
                    alt={photo.alt_description}
                  />
                </li>
              )
            } else { //sinon on renvoie la photo normalement
              return (
                <li key={photo.id}>
                  <img
                    className="w-full h-full object-cover"
                    src={photo.urls.regular}
                    alt={photo.alt_description}
                  />
                </li>
              )
            }
          })}
      </ul>

      {/* Affichage du spinner de chargement */}
      {photosApiData.loading && !photosApiData.error.state && (
        <img className="block mx-auto" src={spinner} />
      )}

      {/* Affichage d'un message lorsque l'utilisateur atteint la dernière page */}
      {photosApiData.maxPages === pageNumber && <p className="mt-10">No more images to show for that query.</p>}
    </>
  )
}
// Importation des hooks nécessaires et de la bibliothèque nanoid
import {useState, useEffect} from "react"
import {nanoid} from "nanoid" //nanoid est une bibliothèque qui génère des identifiants uniques

// Définition du hook personnalisé usePhotos
export default function usePhotos(querySearch, pageIndex) {
  // Définition des états pour l'erreur, les photos, le nombre maximum de pages et l'état de chargement
  const [error, setError] = useState({
    msg: "",
    state: false
  })
  const [photos, setPhotos] = useState([])
  const [maxPages, setMaxPages] = useState(0)
  const [loading, setLoading] = useState(true)

  //8- useEffect qui réinitialise les photos et le nombre maximum de pages lorsque la recherche change
  useEffect(() => {
    if(photos.length !== 0 && maxPages !== 0) {
      setPhotos([])
      setMaxPages(0)
    }
  }, [querySearch])

  // Deuxième useEffect qui effectue la requête à l'API Unsplash lorsque la recherche ou la page change
  useEffect(() => {
    setLoading(true)

    fetch(`https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${querySearch}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`)
    .then(response => {
      // Si la réponse n'est pas ok, lance une erreur
      if(!response.ok) throw new Error(`${response.status} Error, something went wrong`)

      // Sinon, renvoie la réponse en JSON
      return response.json()
    })
    .then(data => {
      // Met à jour l'état des photos en ajoutant les nouvelles photos aux photos existantes
      setPhotos(state => [...state, ...data.results])
      // Met à jour le nombre maximum de pages
      setMaxPages(data.total_pages)
      // Met à jour l'état de chargement
      setLoading(false)
    })
    .catch(err => {
      // En cas d'erreur, met à jour l'état de l'erreur et l'état de chargement
      setError({
        msg: err.message,
        state: true
      })
      setLoading(false)
    })

  }, [querySearch, pageIndex])

  // Renvoie les états pour être utilisés dans d'autres composants
  return {error, photos, maxPages, loading}
}


/**
 * Ce hook personnalisé peut être utilisé dans d'autres composants pour récupérer des photos à partir de l'API Unsplash. Il gère également l'état de chargement et les erreurs, ce qui permet de les gérer facilement dans les composants qui utilisent ce hook.
 */
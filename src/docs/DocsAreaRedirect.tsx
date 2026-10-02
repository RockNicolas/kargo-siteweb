import { Navigate, useParams } from 'react-router-dom'
import { areaPorId, artigosDaArea, caminhoDoArtigo } from './registry'

/** /docs/manual e /docs/api abrem o primeiro artigo da área; área desconhecida volta para /docs. */
export function DocsAreaRedirect() {
  const { area: areaId } = useParams()
  const area = areaPorId(areaId)
  if (!area) return <Navigate to="/docs" replace />
  return <Navigate to={caminhoDoArtigo(artigosDaArea(area)[0])} replace />
}

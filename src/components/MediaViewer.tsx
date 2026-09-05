import { useEffect } from 'react'
import type { ViewerAsset } from '../lib/types'
import { isDownloadableKind } from '../lib/files'
import './MediaViewer.css'

type Props = {
  asset: ViewerAsset | null
  allowDownloads: boolean
  onClose: () => void
}

export function MediaViewer({ asset, allowDownloads, onClose }: Props) {
  useEffect(() => {
    if (!asset) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [asset, onClose])

  if (!asset) return null

  const kind = asset.kind === 'unknown' && asset.imageUrl ? 'image' : asset.kind
  const canDownload =
    allowDownloads &&
    Boolean(asset.fileUrl || (kind === 'image' && asset.imageUrl)) &&
    isDownloadableKind(kind)

  const downloadHref =
    asset.fileUrl || (kind === 'image' || asset.imageUrl ? asset.imageUrl : null)

  return (
    <div className="viewer-backdrop" role="dialog" aria-modal="true" aria-label={asset.title}>
      <button type="button" className="viewer-scrim" aria-label="Close viewer" onClick={onClose} />
      <div className="viewer-panel">
        <header className="viewer-header">
          <div>
            <h2>{asset.title}</h2>
            {asset.subtitle ? <p>{asset.subtitle}</p> : null}
          </div>
          <div className="viewer-actions">
            {canDownload && downloadHref ? (
              <a className="cta ghost" href={downloadHref} download target="_blank" rel="noreferrer">
                Download
              </a>
            ) : null}
            {asset.linkUrl ? (
              <a className="cta ghost" href={asset.linkUrl} target="_blank" rel="noreferrer">
                Open link
              </a>
            ) : null}
            <button type="button" className="cta primary" onClick={onClose}>
              Close
            </button>
          </div>
        </header>

        <div className="viewer-stage">
          {kind === 'embed' && asset.embedUrl ? (
            <iframe
              title={asset.title}
              src={asset.embedUrl}
              className="viewer-frame viewer-embed"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : null}

          {kind === 'pdf' && asset.fileUrl ? (
            <iframe title={asset.title} src={asset.fileUrl} className="viewer-frame" />
          ) : null}

          {kind === 'video' && asset.fileUrl ? (
            <video
              className="viewer-video"
              src={asset.fileUrl}
              controls
              controlsList={allowDownloads ? undefined : 'nodownload'}
              playsInline
            />
          ) : null}

          {(kind === 'image' || (!asset.fileUrl && !asset.embedUrl && asset.imageUrl)) &&
          asset.imageUrl ? (
            <img
              className="viewer-image"
              src={asset.imageUrl}
              alt={asset.title}
              draggable={allowDownloads}
            />
          ) : null}

          {kind === 'link' && !asset.imageUrl ? (
            <div className="viewer-link-card">
              <p>Open this link in a new tab for the best view.</p>
              {asset.linkUrl ? (
                <a className="cta primary" href={asset.linkUrl} target="_blank" rel="noreferrer">
                  Open link
                </a>
              ) : null}
            </div>
          ) : null}

          {kind === 'unknown' && asset.fileUrl ? (
            <iframe title={asset.title} src={asset.fileUrl} className="viewer-frame" />
          ) : null}
        </div>
      </div>
    </div>
  )
}

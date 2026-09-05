import { useEffect } from 'react'
import type { ViewerAsset } from '../lib/types'
import { isDownloadableKind } from '../lib/files'
import './MediaViewer.css'

type Props = {
  asset: ViewerAsset | null
  assets?: ViewerAsset[]
  assetIndex?: number | null
  allowDownloads: boolean
  onClose: () => void
  onNavigate?: (index: number) => void
}

export function MediaViewer({
  asset,
  assets,
  assetIndex = null,
  allowDownloads,
  onClose,
  onNavigate,
}: Props) {
  const carousel = Boolean(assets && assets.length > 1 && onNavigate && assetIndex !== null)
  const total = assets?.length ?? 0
  const current = assetIndex ?? 0

  useEffect(() => {
    if (!asset) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (!carousel || !assets || !onNavigate) return
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onNavigate((current - 1 + total) % total)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate((current + 1) % total)
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [asset, carousel, assets, onNavigate, onClose, current, total])

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
            {carousel ? (
              <p className="viewer-count">
                {current + 1} / {total}
                <span className="viewer-keys"> · ← → to browse · Esc to close</span>
              </p>
            ) : (
              <p className="viewer-count">
                <span className="viewer-keys">Esc to close</span>
              </p>
            )}
          </div>
          <div className="viewer-actions">
            {carousel && assets && onNavigate ? (
              <>
                <button
                  type="button"
                  className="cta ghost"
                  onClick={() => onNavigate((current - 1 + total) % total)}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="cta ghost"
                  onClick={() => onNavigate((current + 1) % total)}
                >
                  Next
                </button>
              </>
            ) : null}
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
              key={asset.fileUrl}
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

import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Package, FileText, Printer, Loader2, Download, Eye } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import PublicLayout from '../components/PublicLayout'
import { ordersApi } from '../api/orders'
import { useAuth } from '../context/AuthContext'
import type { Order } from '../types'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente',  color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  paid:    { label: 'Payée',       color: 'bg-green-50 text-green-700 border-green-200' },
  failed:  { label: 'Échouée',     color: 'bg-red-50 text-red-700 border-red-200' },
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const invoiceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    ordersApi.get(Number(id))
      .then(setOrder)
      .catch(() => setError('Impossible de charger cette commande.'))
      .finally(() => setLoading(false))
  }, [id])

  const handlePrint = () => {
    const content = invoiceRef.current
    if (!content) return
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Facture ${order?.order_number}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #18181b; padding: 40px; }
          .invoice { max-width: 800px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; padding-bottom: 24px; border-bottom: 1px solid #e4e4e7; }
          .logo { font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
          .logo span { color: #a1a1aa; font-weight: 300; }
          .badge { display: inline-block; padding: 3px 10px; font-size: 11px; font-weight: 600; border-radius: 6px; }
          .badge-paid { background: #f0fdf4; color: #15803d; }
          .badge-pending { background: #fefce8; color: #a16207; }
          .badge-failed { background: #fef2f2; color: #b91c1c; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 40px; }
          .info-block h3 { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa; margin-bottom: 8px; }
          .info-block p { font-size: 13px; line-height: 1.6; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
          thead th { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa; padding: 12px 0; border-bottom: 1px solid #e4e4e7; text-align: left; }
          thead th:last-child, thead th:nth-child(3) { text-align: right; }
          tbody td { padding: 16px 0; font-size: 13px; border-bottom: 1px solid #f4f4f5; }
          tbody td:last-child, tbody td:nth-child(3) { text-align: right; }
          .totals { display: flex; justify-content: flex-end; }
          .totals-box { width: 280px; }
          .totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; color: #71717a; }
          .totals-row.total { border-top: 1px solid #e4e4e7; padding-top: 16px; margin-top: 8px; font-size: 16px; font-weight: 700; color: #18181b; }
          .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #e4e4e7; text-align: center; font-size: 11px; color: #a1a1aa; }
          @media print { body { padding: 20px; } .no-print { display: none; } }
        </style>
      </head>
      <body>${content.innerHTML}
      </body>
      </html>
    `)
    win.document.close()
    win.print()
  }

  const handleDownloadPdf = () => {
    if (!order) return

    const doc = new jsPDF()
    const date = new Date(order.created_at)
    const fDate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    const invNum = `FAC-${order.order_number.replace('CMD-', '')}`

    // Header
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('Amazone Store', 20, 25)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(150)
    doc.text('www.amazone-store.fr', 20, 32)

    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0)
    doc.text('FACTURE', 190, 22, { align: 'right' })
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100)
    doc.text(invNum, 190, 29, { align: 'right' })

    const statusText = STATUS_LABELS[order.status]?.label ?? order.status
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    if (order.status === 'paid') doc.setTextColor(21, 128, 61)
    else if (order.status === 'pending') doc.setTextColor(161, 98, 7)
    else doc.setTextColor(185, 28, 28)
    doc.text(statusText.toUpperCase(), 190, 36, { align: 'right' })

    // Line
    doc.setDrawColor(228, 228, 231)
    doc.line(20, 42, 190, 42)

    // Client info
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(161, 161, 170)
    doc.text('FACTURÉ À', 20, 52)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0)
    doc.text(user?.name ?? '', 20, 59)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100)
    doc.text(user?.email ?? '', 20, 65)

    let clientY = 71
    if (order.shipping_address) {
      doc.text(order.shipping_address, 20, clientY)
      clientY += 5
      doc.text(`${order.shipping_postal_code ?? ''} ${order.shipping_city ?? ''}`, 20, clientY)
      clientY += 5
      doc.text(order.shipping_country ?? '', 20, clientY)
    }

    // Invoice details (right side)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(161, 161, 170)
    doc.text('DÉTAILS DE LA FACTURE', 190, 52, { align: 'right' })

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100)
    doc.text(`Date : ${fDate}`, 190, 59, { align: 'right' })
    doc.text(`Commande : ${order.order_number}`, 190, 65, { align: 'right' })
    doc.text(`Facture : ${invNum}`, 190, 71, { align: 'right' })

    // Items table
    const tableY = Math.max(clientY, 71) + 12
    autoTable(doc, {
      startY: tableY,
      head: [['Produit', 'Qté', 'Prix unit.', 'Total']],
      body: order.items.map(item => [
        item.product_name,
        String(item.quantity),
        `${(item.unit_price / 100).toFixed(2)} €`,
        `${((item.unit_price * item.quantity) / 100).toFixed(2)} €`,
      ]),
      styles: { fontSize: 9, cellPadding: 5, textColor: [24, 24, 27] },
      headStyles: { fillColor: [250, 250, 250], textColor: [161, 161, 170], fontStyle: 'bold', fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { halign: 'center', cellWidth: 20 },
        2: { halign: 'right', cellWidth: 35 },
        3: { halign: 'right', cellWidth: 35 },
      },
      margin: { left: 20, right: 20 },
    })

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10
    const totalsX = 130
    const valX = 190

    const rows = [
      ['Sous-total HT', `${(order.subtotal / 100 / 1.2).toFixed(2)} €`],
      ['TVA (20%)', `${(order.subtotal / 100 - order.subtotal / 100 / 1.2).toFixed(2)} €`],
      ['Livraison', order.shipping === 0 ? 'Gratuit' : `${(order.shipping / 100).toFixed(2)} €`],
    ]

    doc.setFontSize(9)
    doc.setTextColor(113, 113, 122)
    rows.forEach((row, i) => {
      const y = finalY + i * 8
      doc.setFont('helvetica', 'normal')
      doc.text(row[0], totalsX, y)
      doc.text(row[1], valX, y, { align: 'right' })
    })

    const totalLineY = finalY + rows.length * 8 + 2
    doc.setDrawColor(228, 228, 231)
    doc.line(totalsX, totalLineY, valX, totalLineY)

    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0)
    doc.text('Total TTC', totalsX, totalLineY + 10)
    doc.text(`${(order.total / 100).toFixed(2)} €`, valX, totalLineY + 10, { align: 'right' })

    // Footer
    const footerY = totalLineY + 30
    doc.setDrawColor(228, 228, 231)
    doc.line(20, footerY, 190, footerY)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(161, 161, 170)
    doc.text('Amazone Store — SIRET : 123 456 789 00001 — TVA FR12345678900', 105, footerY + 8, { align: 'center' })
    doc.text('Merci pour votre achat !', 105, footerY + 14, { align: 'center' })

    // Open in new tab
    const pdfBlob = doc.output('blob')
    const blobUrl = URL.createObjectURL(pdfBlob)
    window.open(blobUrl, '_blank')
  }

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex-grow flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
        </div>
      </PublicLayout>
    )
  }

  if (error || !order) {
    return (
      <PublicLayout>
        <div className="flex-grow flex flex-col items-center justify-center py-32 text-center px-4">
          <p className="text-base font-semibold text-zinc-700 mb-2">Commande introuvable</p>
          <p className="text-sm text-zinc-400 mb-6">{error}</p>
          <Link to="/account" className="px-6 py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors">
            Retour à mon compte
          </Link>
        </div>
      </PublicLayout>
    )
  }

  const statusInfo = STATUS_LABELS[order.status] ?? { label: order.status, color: 'bg-zinc-50 text-zinc-600 border-zinc-200' }
  const date = new Date(order.created_at)
  const formattedDate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const invoiceNumber = `FAC-${order.order_number.replace('CMD-', '')}`

  return (
    <PublicLayout>
      <div className="flex-grow bg-[#FDFDFD]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Back + actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Link
                to="/account"
                onClick={() => {}}
                className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-zinc-500" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-black">Commande {order.order_number}</h1>
                  <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-md border ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mt-0.5">{formattedDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-black bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Imprimer
              </button>
              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-black rounded-xl hover:bg-zinc-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Télécharger la facture
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Main: articles */}
            <div className="lg:col-span-2 space-y-6">

              {/* Articles list */}
              <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-zinc-100">
                  <h2 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Articles commandés ({order.items.length})
                  </h2>
                </div>
                <div className="divide-y divide-zinc-100">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 px-6 py-5">
                      <div className="w-14 h-14 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0">
                        <Package className="w-6 h-6 text-zinc-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black truncate">{item.product_name}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {(item.unit_price / 100).toFixed(2)} € × {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-black shrink-0">
                        {((item.unit_price * item.quantity) / 100).toFixed(2)} €
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="bg-zinc-50 px-6 py-5 space-y-3">
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Sous-total</span>
                    <span className="font-medium text-black">{(order.subtotal / 100).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Livraison</span>
                    <span className="font-medium text-black">
                      {order.shipping === 0 ? 'Gratuit' : `${(order.shipping / 100).toFixed(2)} €`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-zinc-200">
                    <span>Total</span>
                    <span>{(order.total / 100).toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">

              {/* Info paiement */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4">Paiement</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Méthode</span>
                    <span className="font-medium text-black">Carte bancaire</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Statut</span>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Date</span>
                    <span className="font-medium text-black">{formattedDate}</span>
                  </div>
                </div>
              </div>

              {/* Info client */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4">Client</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Nom</span>
                    <span className="font-medium text-black">{user?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">E-mail</span>
                    <span className="font-medium text-black truncate ml-4">{user?.email}</span>
                  </div>
                </div>
              </div>

              {/* Adresse de livraison */}
              {order.shipping_address && (
                <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                  <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4">Adresse de livraison</h3>
                  <div className="space-y-1 text-sm text-black">
                    <p className="font-medium">{order.shipping_address}</p>
                    <p>{order.shipping_postal_code} {order.shipping_city}</p>
                    <p className="text-zinc-500">{order.shipping_country}</p>
                  </div>
                </div>
              )}

              {/* Facture */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6">
                <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4">Facture</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">{invoiceNumber}</p>
                    <p className="text-xs text-zinc-400">{formattedDate}</p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadPdf}
                  className="w-full py-2.5 text-sm font-medium text-black bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Voir la facture
                </button>
              </div>
            </div>
          </div>

          {/* Hidden printable invoice */}
          <div className="hidden">
            <div ref={invoiceRef}>
              <div className="invoice">
                <div className="header">
                  <div>
                    <div className="logo">Amazone <span>Store</span></div>
                    <p style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px' }}>www.amazone-store.fr</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>FACTURE</p>
                    <p style={{ fontSize: '13px', color: '#71717a' }}>{invoiceNumber}</p>
                    <span className={`badge badge-${order.status}`}>{statusInfo.label}</span>
                  </div>
                </div>

                <div className="info-grid">
                  <div className="info-block">
                    <h3>Facturé à</h3>
                    <p><strong>{user?.name}</strong></p>
                    <p>{user?.email}</p>
                    {order.shipping_address && (
                      <>
                        <p style={{ marginTop: '8px' }}>{order.shipping_address}</p>
                        <p>{order.shipping_postal_code} {order.shipping_city}</p>
                        <p>{order.shipping_country}</p>
                      </>
                    )}
                  </div>
                  <div className="info-block" style={{ textAlign: 'right' }}>
                    <h3>Détails de la facture</h3>
                    <p>Date : {formattedDate}</p>
                    <p>Commande : {order.order_number}</p>
                    <p>Facture : {invoiceNumber}</p>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Qté</th>
                      <th>Prix unit.</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map(item => (
                      <tr key={item.id}>
                        <td>{item.product_name}</td>
                        <td>{item.quantity}</td>
                        <td style={{ textAlign: 'right' }}>{(item.unit_price / 100).toFixed(2)} €</td>
                        <td style={{ textAlign: 'right' }}>{((item.unit_price * item.quantity) / 100).toFixed(2)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="totals">
                  <div className="totals-box">
                    <div className="totals-row">
                      <span>Sous-total HT</span>
                      <span>{(order.subtotal / 100 / 1.2).toFixed(2)} €</span>
                    </div>
                    <div className="totals-row">
                      <span>TVA (20%)</span>
                      <span>{(order.subtotal / 100 - order.subtotal / 100 / 1.2).toFixed(2)} €</span>
                    </div>
                    <div className="totals-row">
                      <span>Livraison</span>
                      <span>{order.shipping === 0 ? 'Gratuit' : `${(order.shipping / 100).toFixed(2)} €`}</span>
                    </div>
                    <div className="totals-row total">
                      <span>Total TTC</span>
                      <span>{(order.total / 100).toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                <div className="footer">
                  <p>Amazone Store — SIRET : 123 456 789 00001 — TVA FR12345678900</p>
                  <p style={{ marginTop: '4px' }}>Merci pour votre achat !</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  )
}



## Modifiche al Footer

### Cosa cambierà:

**Nella descrizione brand (riga 61-64):**
- DA: "Conserve artigianali dal Parco del Cilento. Piccoli lotti, ingredienti italiani, gusto autentico."
- A: "Conserve Artigianali Gourmet"

**Nei contatti (righe 66-86):**
- ✅ Tengo: Email (info@minnelea.it)
- ❌ Rimuovo: Telefono (+39 000 000 0000)
- ✅ Cambio indirizzo: "Moio della Civitella, Parco Nazionale del Cilento, Provincia SA"

### File da modificare:
`src/components/layout/Footer.tsx`

### Modifiche tecniche:
1. Rimuovo import `Phone` da lucide-react
2. Aggiorno il testo descrittivo
3. Elimino il blocco telefono
4. Aggiorno l'indirizzo con la nuova località


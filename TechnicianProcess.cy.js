describe('Open Ticket - Technician', () => {
    beforeEach(() => {
    // Kunjungi halaman login
    cy.visit('https://pushme-stagging.pusri.dev/login')

    // Login sebagai user
    cy.get('.space-y-6 > :nth-child(1)').type('121559') // Input Username
    cy.get('.space-y-6 > :nth-child(2)').type('bypass')  // Input Password
    cy.get('.bg-primary').click() // Klik tombol "Login"

    // Verifikasi bahwa URL berubah ke dashboard setelah login berhasil
    cy.url({ timeout: 10000 }).should('include', '/dashboard')
    })

    it('PIC Assign to Technician', () => {
        cy.wait(4000)
        cy.contains('Daftar Tiket', { timeout: 10000 }).click()
        // Pilih Kasus
        cy.get(':nth-child(1) > .relative > [style="backface-visibility: hidden;"] > .rounded-xl > .p-4 > .space-y-2 > .font-semibold').click()
        // Klik "Tindakan"
        cy.wait(3000)
        cy.get(':nth-child(6) > .inline-flex').click()
        // Klik Update Status
        cy.get('.pt-0 > :nth-child(2) > .inline-flex').click()
        // Isi deksripsi status tiket
        cy.get('.space-y-4 > :nth-child(1) > .border > .relative > :nth-child(1) > :nth-child(1) > .tiptap').type('test')
        // Upload Lampiran
        cy.get('.pt-0 > .space-y-4 > :nth-child(2) > .flex-col > .flex')
        const fileName = 'lampiranTest.jpg' 
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${fileName}`, { force: true })
        // Klik Update Status
        cy.get(':nth-child(3) > .inline-flex').click()
    })
})
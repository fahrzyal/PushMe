describe('Open Ticket - PIC', () => {
    beforeEach(() => {
    // Kunjungi halaman login
    cy.visit('https://pushme-stagging.pusri.dev/login')

    // Login sebagai user
    cy.get('.space-y-6 > :nth-child(1)').type('121559') // Input Username
    cy.get('.space-y-6 > :nth-child(2)').type('bypass')  // Input Password
    cy.get('.bg-primary').click() // Klik tombol "Login"

    // Verifikasi bahwa URL berubah ke dashboard setelah login berhasil
    cy.url({ timeout: 10000 }).should('include', '/dashboard')

    // Ganti role
    cy.get('[data-cy="user-menu-button"] > .hidden').click() // Buka menu user
    cy.contains('div[role="menuitem"]', 'PIC', { timeout: 5000 }).click() // Pilih role "PIC"

    // Verifikasi role sudah terganti
    cy.contains('Requester').should('be.visible')
    })

    it('PIC Assign to Technician', () => {
        cy.wait(3000)
        cy.contains('Daftar Tiket', { timeout: 10000 }).click()
        // Pilih Kasus
        cy.get(':nth-child(1) > .relative > [style="backface-visibility: hidden;"] > .rounded-xl > .p-4 > .space-y-2 > .font-semibold').click()
        //Klik "Tindakan"
        cy.get(':nth-child(6) > .bg-primary').click()
        cy.wait(3000)
        // Tambahkan Subtask tiket
        cy.get('.space-y-4 > .flex > .inline-flex').should('be.visible').click()
        
        // Isi Form Subtast tiket
        cy.get('form.space-y-4 > :nth-child(1) > .text-sm').type('Judul test')
        cy.get('form.space-y-4 > :nth-child(2)').type('Deskripsi Test')
        cy.get('form.space-y-4 > .space-y-4 > .flex').click()
        const fileName = 'lampiranTest.jpg' 
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${fileName}`, { force: true })
        // Pilih Label
        cy.get('button[role="combobox"][aria-label="Low"]').click()
        cy.get('[role="option"]').should('be.visible')
        cy.get('[role="option"]').first().click()
        // Pilih Tekninsi
        cy.get('button[role="combobox"][aria-label="Pilih teknisi"]').click()
        cy.get('[role="option"]').should('be.visible')
        cy.get('[role="option"]').eq(2).click()
        // Klik "Buat Subtask"
        cy.get('.flex-col-reverse > .inline-flex').click({ force: true })
  })
})
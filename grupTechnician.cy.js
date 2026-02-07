describe('Manajemen Pengguna - Service Desk', () => {
    beforeEach( () => {
        // Kunjungi halaman login
        cy.visit('https://pushme-stagging.pusri.dev/login')

        // Login sebagai user
        cy.get('.space-y-6 > :nth-child(1)').type('1102871') // Input Username
        cy.get('.space-y-6 > :nth-child(2)').type('bypass')  // Input Password
        cy.get('.bg-primary').click() // Klik tombol "Login"

        // Verifikasi bahwa URL berubah ke dashboard setelah login berhasil
        cy.url({ timeout: 10000 }).should('include', '/dashboard')

        // Ganti role
        cy.get('[data-cy="user-menu-button"] > .hidden').click() // Buka menu user
        cy.contains('div[role="menuitem"]', 'Service Desk', { timeout: 3000 }).click() // Pilih role "Service Desk"

        // Verifikasi role sudah terganti
        cy.contains('Requester').should('be.visible')
    })

    it('Create Group', () => {
        // Buka menu Manajemen Pengguna
        cy.wait(3000)
        cy.contains('Manajemen Pengguna', { timeout: 10000 }).click()
        // Klik "Grup Teknisi"
        cy.get('.mx-3\\.5 > .min-w-0 > :nth-child(2) > a > .peer\\/menu-button').click()
        cy.wait(3000)
        // Klik "Tambah Grup"
        cy.get('.justify-between > .inline-flex').type('Dummy Group')
        cy.get('.space-y-4 > .inline-flex').click()
    })

    it('Edit Role Group', () => {
        // Buka menu Manajemen Pengguna
        cy.contains('Manajemen Pengguna', { timeout: 10000 }).click()
        // Klik "Grup Teknisi"
        cy.get('.mx-3\\.5 > .min-w-0 > :nth-child(2) > a > .peer\\/menu-button').click()
        cy.wait(5000) 
        // Cari "Dummy Group"
        cy.get('.relative.w-full > .relative > .flex').type('Dummy Group')
        cy.wait(3000)
        cy.get(':nth-child(6) > .flex > a.inline-flex').click()
        // Tambah PIC
        cy.get('.css-19bb58m').type('Arline Antasya')
        cy.wait(3000)
        cy.get('#react-select-2-option-0').click()
        cy.wait(3000)
        cy.get('.pt-0 > .inline-flex').click()
        // Tambah anggota
        cy.get('#radix-\\:r3a\\:-trigger-anggota').click()
        cy.get('.css-19bb58m').type('Dummy User')
        cy.wait(4000)
        cy.get('#react-select-3-option-0').click()
        cy.get('.pt-0 > .inline-flex').click()
        // Tambah Eskalasi
        cy.get('#radix-\\:r3a\\:-trigger-eskalasi').click()
        cy.get('.css-19bb58m').type('Dummy User')
        cy.wait(4000) 
        cy.get('#react-select-3-option-0').click()
        cy.get('#notify-time').type('2')
        cy.get('.md\\:w-auto > .inline-flex').click()
        cy.get('.space-y-2 > .flex-col > div.flex > .inline-flex').click()
        // Tambah Roles
        cy.get('#radix-\\:r3a\\:-trigger-eskalasi').click()
        cy.get(':nth-child(1) > .pt-0 > .flex-col > :nth-child(1) > .flex > .peer').click()
        cy.get(':nth-child(1) > .pt-0 > .flex-col > :nth-child(2) > .flex > .peer').click()
        cy.get(':nth-child(1) > .pt-0 > .flex-col > :nth-child(3) > .flex > .peer').click()
        cy.get('.container > .border-input').click()
    })

    it('Edit Nama Group', () => {
        // Buka menu Manajemen Pengguna
        cy.contains('Manajemen Pengguna', { timeout: 10000 }).click()
        // Klik "Grup Teknisi"
        cy.get('.mx-3\\.5 > .min-w-0 > :nth-child(2) > a > .peer\\/menu-button').click()
        cy.wait(5000) 
        // Cari "Dummy Group"
        cy.get('.relative.w-full > .relative > .flex').type('Dummy Group')
        cy.wait(3000)
        cy.get(':nth-child(6) > .flex > button.hover\\:bg-accent').type('Edit Nama Dummy Group')
        cy.get('.space-y-4 > .inline-flex').click()
    })
})
describe('Open Ticket - Requester', () => {
    beforeEach( () => {
        // Kunjungi halaman login
        cy.visit('https://pushme-stagging.pusri.dev/login')

        // Login sebagai user
        cy.get('.space-y-6 > :nth-child(1)').type('9900412') // Input Username
        cy.get('.space-y-6 > :nth-child(2)').type('bypass')  // Input Password
        cy.get('.bg-primary').click() // Klik tombol "Login"

        // Verifikasi bahwa URL berubah ke dashboard setelah login berhasil
        cy.url({ timeout: 10000 }).should('include', '/dashboard')

        // Ganti role
        cy.get('[data-cy="user-menu-button"] > .hidden').click() // Buka menu user
        cy.contains('div[role="menuitem"]', 'Requester', { timeout: 5000 }).click() // Pilih role "Requester"

        // Verifikasi role sudah terganti
        cy.contains('Requester').should('be.visible')
    })

    it('Buat Tiket', () => {
        //Buka Sidebar klik "Buat Tiket"
        cy.get('button[data-sidebar="menu-button"]')
        cy.contains('Buat Tiket').click()

        // Pilih Permasalahan
        cy.get('input[placeholder="Cari Pertanyaan..."]').type('Jaringan')
        cy.get(':nth-child(10) > .p-2').click()

        // Klik tombol "Buat Pengaduan"
        cy.get('.flex-col > .inline-flex').click()

        // Isi form pengaduan
        cy.wait(3000)
        cy.get('.pt-0 > .grid > :nth-child(1)').type('081234567891')
        cy.get('input[placeholder="Masukkan alamat email"]').type('fahrzyall@gmail.com')
        cy.get('input[placeholder="Masukkan nomor telepon"]').type('08987654321')
        cy.get('input[placeholder="Masukkan extension (jika ada)"]').type('Extension test')

        // Isi waktu
        // cy.get('.inline-flex > .text-muted-foreground').click()
        // cy.get('.bg-accent > .items-center').click()
        // cy.get(':nth-child(2) > .space-y-2 > .w-full').type('12:00')

        // Isi deskripsi
        cy.get('.tiptap').click().type('{moveToStart}')

        cy.get('.tiptap').type('{end} Test')
        cy.get('.tiptap').type('{downarrow}{end} test')
        cy.get('.tiptap').type('{downarrow}{end} test')
        cy.get('.tiptap').type('{downarrow}{end} test')
        cy.get('.tiptap').type('{downarrow}{end} test')
        cy.get('.tiptap').type('{downarrow}{end} test')

        // Upload Lampiran(jpg, pdf, xlsx)
        const fileNames = ['lampiranTest.jpg', 'lampiranTest.pdf', 'lampiranTest.xlsx']

        cy.get('input[type="file"]').selectFile(
        fileNames.map(name => `cypress/fixtures/${name}`),
        { force: true }
        )

        // Validasi deskripsi tidak kosong
        cy.get('.tiptap').invoke('text').should('not.be.empty')

        // Validasi setiap file lampiran muncul
        fileNames.forEach(file => {
        cy.contains(file).should('be.visible')
        })
        cy.wait(5000)

        // Submit tiket
        cy.get(':nth-child(4) > .inline-flex').click()
    })

})
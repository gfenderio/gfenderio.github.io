// ---------------------------------------------------------
// EN / ID copy. English is the HTML default; these keys keep
// both languages in sync. Tone & rules: see skills.md.
//
// Written for someone who is not a developer. A recruiter, a
// business owner, a hiring manager. The prose says what the
// software does for the people using it and what problem it
// solved; the technology stays in the stack chips, where a
// technical reader will look for it anyway.
//
// Indonesian is written, not translated. Short sentences
// (6-15 words), verb-first where it reads well, no em dashes,
// and never "dia" for software. Readers are addressed as
// "kamu". Anything that only works because English works
// that way is a bug: "berjalan di atas", "sepotong demi
// sepotong", "duduk di antara".
//
// Kyou systems are described by function, not by internal
// codename or repository. Contribution figures come from git.
// Where a system was built by the team, the copy says so and
// claims only the part that is mine.
// ---------------------------------------------------------

const translations = {
    en: {
        "nav.work": "Work",
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.contact": "Contact",

        "hero.status": "Software Engineer @ Kyou · E-commerce &amp; fulfilment · Indonesia, open to remote",
        "hero.title": "I build the software<br>that runs the work.",
        "hero.lead": "I&rsquo;m Gilang, a software engineer at Kyou, a hobby shop that sells through its own website, Shopee, Tokopedia and TikTok Shop. I build what an order passes through on its way out: the price and promo tools, payments and reports, and the Android app the warehouse uses to pick, pack and count stock.",
        "hero.cta_work": "See my work",
        "hero.cta_contact": "Get in touch",

        "work.title": "Selected work.",
        "work.intro": "Software people use every day, and products I designed and shipped on my own.",
        "work.gallery": "View screenshots",
        "work.live_tag": "Live",
        "work.wip_tag": "Live",
        "work.prod_tag": "Used daily",

        "work.tier1": "Built at work · Kyou",
        "work.tier1_note": "The online-store, warehouse and delivery teams use these every day. I describe them by what they do. The internal names and the code stay private, and every screenshot runs on made-up data.",
        "work.tier2": "My own products &amp; client work",

        "work.ecom.name": "Marketplace &amp; Online Store Tools",
        "work.ecom.metric": "Shopee, Tokopedia and TikTok Shop, run from one place",
        "work.ecom.desc": "Selling on three marketplaces means three sets of prices, promos and reports that rarely agree. I built the tools the e-commerce team uses to keep them straight. Store prices and discount quotas are set from one screen, and each marketplace&rsquo;s discount list is imported as a file instead of typed in. The monthly report breaks net revenue down by channel and splits cancellations by cause. There is also a Chrome extension that puts Kyou&rsquo;s own controls straight into the Shopee seller page.",

        "work.data.name": "One Price, Everywhere",
        "work.data.metric": "The marketplace price model in the data warehouse",
        "work.data.desc": "Kyou&rsquo;s numbers used to come straight from raw logs, and every screen worked them out a little differently. The team built a data warehouse that rebuilds clean, tested tables on a schedule. My part in it is the table that settles what each item sells for on the marketplaces. Then I moved the tools onto the data warehouse, so they stop doing their own sums: the store price screens, the warehouse app, the daily boards and the stock history. Where the history is incomplete, the screen now says so instead of guessing.",

        "work.platform.name": "The Company&rsquo;s Working Platform",
        "work.platform.metric": "Second-largest contributor to the codebase",
        "work.platform.desc": "Kyou used to run on spreadsheets and a PHP admin panel written years ago. I&rsquo;m moving it into one platform, a process at a time: stock, price changes, stock rotation, courier rates, payment confirmations. I build each one end to end, from the screen to the API to the tables. The old system stays live while this happens, so I maintain it too and wire the two together. Payment confirmation, for one, can be pointed at the old system or the new one with a setting, without a redeploy. I also built the sales dashboard the managers read every morning.",

        "work.pda.name": "The Warehouse App",
        "work.pda.metric": "About 70% of the app is mine, now on version 2.45",
        "work.pda.desc": "An Android app the warehouse staff carry all day: counting stock, picking and packing orders, checking in deliveries, and ringing up sales at events. I built barcode scanning through the phone camera, a stock count that starts at the shelf and asks for a photo as proof, and a check-in several people can work on at once without overwriting each other. Online orders show when they were requested and turn red once they are a day late. One screen keeps working with no signal, because parts of the warehouse have none. Cost prices are left out on purpose: floor staff see what they need and nothing more.",

        "work.label.name": "The Goods-In Label Printer",
        "work.label.metric": "25 releases, and it updates itself",
        "work.label.desc": "When a delivery arrives, some of it belongs on the shop shelves and some of it has already been bought by a customer. Both turn up in the same box, and mixing them up means somebody loses the thing they paid for. This desktop app reads what came in and prints a small sticker for each item. Anything already sold gets its own mark and the buyer&rsquo;s reference, so it can&rsquo;t end up on a shelf by mistake. It only ever reads. It cannot change stock or orders, by design.",

        "work.ops.name": "The Fulfilment Bot",
        "work.ops.metric": "Running every day since May",
        "work.ops.desc": "A bot that connects the warehouse with the people running it. Proof photos follow every order through picking, packing and handover, and file themselves where they belong. Split shipments are worked out and sent to print without anyone chasing the paperwork. An order stuck halfway through picking is raised with whoever can unstick it, the moment it stalls. The recurring jobs run on schedule, without anyone having to remember them.",

        "work.vault.desc": "A gallery for my own Yu-Gi-Oh! card collection. Each card tilts under your cursor and the foil catches the light the way the real one does, with a different holo pattern for each rarity. Prices are looked up per rarity, so a rare printing never inflates the price of the common one.",
        "work.vault.live": "Visit the gallery",

        "work.stzn.desc": "An online streetwear shop I designed and built from scratch. It is open and complete: you can browse it, put things in a basket, and pay, including by QRIS.",
        "work.stzn.live": "Visit live site",
        "work.kasirin.desc": "A checkout system for busy minimarkets with tens of thousands of products. The till keeps working when the internet drops, stock updates on every screen the moment something sells, and two cashiers can never sell the same last item twice. It also learns what runs out quickly and flags it before the shelf is empty.",
        "work.itungin.desc": "A personal money app for Android. It tracks what comes in and goes out on a live chart, tells you whether your debts are getting heavy, warns you before a spending category runs over budget, and reminds you when a bill is due.",

        "work.sias.name": "A School Portal",
        "work.sias.desc": "An academic portal for a primary school, not a brochure site. Teachers enter marks, admin manages pupil records and school fees, and parents see their own child&rsquo;s progress and what is still owed. Sign in as any of the three roles and look around: the demo is read-only, so nothing you do changes what the next visitor sees, and every pupil in it is invented.",
        "work.sias.live": "Try the demo",

        "work.agency.name": "A Digital Agency Website",
        "work.agency.desc": "A company website for a digital agency: eleven pages covering services, past work, the team, and how to get in touch, with a WhatsApp shortcut for people who would rather not fill in a form. Whatever a prospective client wants to know is never more than three clicks from the front page. This is the kind of website I build for clients, ready to be rebranded for one.",
        "work.agency.live": "Visit live site",

        "about.title": "About.",
        "about.p1": "I build software people rely on to get through their working day. At Kyou that covers the whole path of an order: the marketplace price and promo tools, payments and reports, the Android app on the warehouse floor, the label printer for goods coming in, and the bot that ties them together. The pattern is nearly always the same. Find the job someone still does by hand, then replace it with something that holds up on a busy day.",
        "about.p2": "Before any of this I spent years on shop floors, running stores and departments, chasing sales targets, keeping stock and prices straight. That wasn&rsquo;t a detour. It&rsquo;s the reason the software works. I already knew where a business quietly loses hours, which numbers people have stopped trusting, and why a screen that is technically correct can still be useless at seven in the morning with a queue building.",
        "about.p3": "I&rsquo;m an Information Systems student, and I learn by building things that get used. If you want someone who understands the shop floor as well as the code, let&rsquo;s talk.",
        "about.skills_title": "What I work with",
        "about.skill_ai": "AI engineering &amp; automation",
        "about.skill_qa": "Testing &amp; quality",
        "about.edu_title": "Education &amp; credentials",
        "about.edu_degree": "B.Tech, Management Information Systems · 2023–2027",

        "act.title": "Code &amp; activity.",
        "act.intro": "My public GitHub activity over the last six months, and what the company code on GitLab adds up to.",
        "act.cal": "GitHub contributions",
        "act.less": "Less",
        "act.more": "More",
        "act.private_title": "What the chart leaves out",
        "act.private_body": "Most of what I build belongs to Kyou, so it lives in private GitLab repositories and never shows up as green squares. Since I joined in May 2026:",
        "act.gl_pushes": "pushes to company repositories",
        "act.gl_role": "access to the company codebase",
        "act.gl_pda": "of the warehouse app&rsquo;s commits",
        "act.gl_platform": "contributor to the main platform",

        "exp.title": "Experience.",
        "exp.present": "Present",
        "exp.kyou.role": "Software Engineer",
        "exp.kyou.desc": "I build Kyou&rsquo;s e-commerce and fulfilment systems: the marketplace tools, payments and reports, the platform the office runs on, and the Android app on the warehouse floor. Most of the work is moving things across, taking a process off a spreadsheet or the old PHP admin and rebuilding it as something people can rely on. I hold maintainer access and ship my own changes to production.",
        "exp.indie.role": "Freelance Developer",
        "exp.indie.desc": "My own practice. I design and build websites, mobile apps, and automation for clients, and I take a project from the first conversation to the finished thing. My own products so far are Kasirin and Itungin. Available for new work.",
        "exp.informa.role": "Assistant Product Specialist",
        "exp.informa.desc": "Ran a department day to day: pricing accuracy, campaigns, stock, and how the floor was laid out. Hit every sales target in my first three months.",
        "exp.lion.role": "Game Tester &amp; Indonesian Voice Specialist",
        "exp.lion.desc": "Tested &ldquo;Gems of War&rdquo;, wrote up the bugs and interface problems I found, and was picked for a Meta-related project recording Indonesian voice lines.",
        "exp.earlier.role": "Earlier · retail",
        "exp.earlier.desc": "The Foodhall (2023–2024): built the reports the store used to make decisions, and tracked sales, returns, and stock. Indomaret Group (2019–2022): ran a store and its team day to day, and hit the sales target on several occasions.",

        "contact.title": "Let&rsquo;s talk.",
        "contact.lead": "Got a job opening, a process that eats your team&rsquo;s time, or something you want built? Send a message. I read every one.",
        "contact.name": "Name",
        "contact.email": "Email",
        "contact.message": "Tell me a bit about it…",
        "contact.send": "Send message",

        "footer.top": "Back to top ↑"
    },

    id: {
        "nav.work": "Karya",
        "nav.about": "Profil",
        "nav.experience": "Pengalaman",
        "nav.contact": "Kontak",

        "hero.status": "Software Engineer @ Kyou · E-commerce &amp; fulfillment · Indonesia, bisa remote",
        "hero.title": "Saya membuat software<br>untuk kerja sehari-hari.",
        "hero.lead": "Saya Gilang, software engineer di Kyou, toko hobi yang jualan lewat situs sendiri, Shopee, Tokopedia, dan TikTok Shop. Saya membangun sistem yang mengurus pesanan dari masuk sampai dikirim. Mulai dari harga dan promo, pembayaran dan laporan, sampai aplikasi Android untuk pick, pack, dan hitung stok di gudang.",
        "hero.cta_work": "Lihat karya",
        "hero.cta_contact": "Hubungi saya",

        "work.title": "Karya pilihan.",
        "work.intro": "Software yang dipakai tiap hari, plus produk yang saya rancang dan rilis sendiri.",
        "work.gallery": "Lihat tampilan",
        "work.live_tag": "Live",
        "work.wip_tag": "Live",
        "work.prod_tag": "Dipakai tiap hari",

        "work.tier1": "Di Kyou",
        "work.tier1_note": "Dipakai tim toko online, gudang, dan pengiriman setiap hari. Saya jelaskan dari fungsinya saja. Nama internal dan kodenya tetap rahasia. Semua screenshot di sini memakai data dummy.",
        "work.tier2": "Produk sendiri &amp; proyek klien",

        "work.ecom.name": "Kelola Marketplace &amp; Toko Online",
        "work.ecom.metric": "Shopee, Tokopedia, dan TikTok Shop dari satu tempat",
        "work.ecom.desc": "Jualan di tiga marketplace artinya harga, promo, dan laporan tersebar di tiga tempat yang jarang cocok satu sama lain. Saya membuat tools yang dipakai tim e-commerce supaya semuanya sinkron. Harga toko dan kuota diskon diatur dari satu layar. Daftar diskon tiap marketplace cukup diunggah, tidak perlu diketik ulang. Laporan bulanan memecah pendapatan bersih per marketplace, dan memisahkan pembatalan menurut penyebabnya. Ada juga extension Chrome yang menaruh tombol Kyou langsung di Seller Centre Shopee.",

        "work.data.name": "Satu Harga, di Semua Layar",
        "work.data.metric": "Model harga marketplace di data warehouse",
        "work.data.desc": "Dulu angka di Kyou diambil langsung dari log mentah. Tiap layar menghitungnya dengan cara sendiri, jadi hasilnya sering beda. Tim lalu membangun data warehouse yang secara terjadwal menyusun ulang tabel yang sudah dibersihkan dan dicek. Bagian saya: tabel yang menentukan harga jual tiap barang di marketplace. Setelah itu saya pindahkan alat-alatnya ke data warehouse, supaya tidak menghitung sendiri lagi. Yang sudah pindah: layar harga toko, aplikasi gudang, papan harian, dan riwayat stok. Kalau riwayatnya belum lengkap, layar sekarang bilang terus terang, bukan menebak.",

        "work.platform.name": "Platform Kerja Perusahaan",
        "work.platform.metric": "Kontributor kode terbanyak kedua",
        "work.platform.desc": "Dulu Kyou bergantung pada spreadsheet dan panel admin PHP yang dibuat bertahun-tahun lalu. Sekarang saya pindahkan bertahap ke satu platform. Stok, perubahan harga, rotasi stok, ongkir, dan konfirmasi pembayaran sudah pindah. Setiap fitur saya kerjakan utuh, dari layar, API, sampai tabelnya. Sistem lama tetap jalan selama proses ini, jadi saya juga merawat dan menyambungkan keduanya. Contohnya, konfirmasi pembayaran bisa diarahkan ke sistem lama atau baru lewat satu pengaturan, tanpa deploy ulang. Saya juga membuat dashboard penjualan yang dibaca manajer setiap pagi.",

        "work.pda.name": "Aplikasi Gudang",
        "work.pda.metric": "Sekitar 70% kodenya saya tulis, sekarang versi 2.45",
        "work.pda.desc": "Aplikasi Android yang dibawa staf gudang seharian. Dipakai untuk hitung stok, pick dan pack pesanan, cek barang datang, sampai jualan di event. Saya membangun scan barcode lewat kamera HP. Hitung stok dimulai dari rak dan wajib pakai foto bukti. Cek barang datang bisa dikerjakan beberapa orang sekaligus tanpa saling timpa. Pesanan online menampilkan tanggal permintaan, dan jadi merah kalau sudah telat sehari. Satu layar tetap jalan tanpa sinyal, karena ada sudut gudang yang memang tidak dapat sinyal. Harga modal sengaja disembunyikan. Staf lapangan cukup melihat yang mereka perlukan.",

        "work.label.name": "Pencetak Label Barang Datang",
        "work.label.metric": "Sudah 25 rilis, dan bisa update sendiri",
        "work.label.desc": "Barang untuk rak toko dan barang yang sudah dibeli pelanggan sering datang dalam satu kardus. Kalau tertukar, pelanggan kehilangan barang yang sudah dibayarnya. Aplikasi desktop ini membaca isi kiriman, lalu mencetak stiker untuk tiap barang. Barang yang sudah terjual dapat tanda khusus dan nomor pesanan pembelinya. Jadi barang itu tidak akan nyasar ke rak. Aplikasinya hanya bisa membaca data. Stok dan pesanan tidak bisa diubah dari sini, dan itu disengaja.",

        "work.ops.name": "Bot Fulfillment",
        "work.ops.metric": "Jalan setiap hari sejak Mei",
        "work.ops.desc": "Bot yang menghubungkan sistem gudang dengan timnya. Foto bukti ikut di setiap tahap pesanan, dari pick, pack, sampai serah ke kurir. Fotonya tersimpan otomatis di tempat yang benar. Kiriman yang dipecah dihitung otomatis, lalu langsung dicetak. Pesanan yang macet di tengah pick langsung dilaporkan ke orang yang bisa membereskannya. Tugas rutin jalan sesuai jadwal, tanpa perlu diingatkan.",

        "work.vault.desc": "Galeri untuk koleksi kartu Yu-Gi-Oh! pribadi saya. Kartu miring mengikuti kursor, dan kilau foil-nya bergerak seperti kartu aslinya. Tiap tingkat kelangkaan punya pola hologram sendiri. Harga diambil per kelangkaan, jadi harga cetakan langka tidak ikut menaikkan harga versi biasa.",
        "work.vault.live": "Buka galerinya",

        "work.stzn.desc": "Toko streetwear online yang saya rancang dan bangun dari nol. Situsnya sudah live dan lengkap. Kamu bisa lihat katalog, isi keranjang, dan bayar, termasuk lewat QRIS.",
        "work.stzn.live": "Buka situsnya",
        "work.kasirin.desc": "Sistem kasir untuk minimarket ramai dengan puluhan ribu jenis barang. Kasir tetap bisa dipakai saat internet putus. Stok di semua layar langsung berubah begitu ada penjualan. Dua kasir tidak mungkin menjual barang terakhir yang sama. Sistem juga mempelajari barang yang cepat habis, lalu menandainya sebelum raknya kosong.",
        "work.itungin.desc": "Aplikasi keuangan pribadi untuk Android. Pemasukan dan pengeluaran tampil di grafik yang terus diperbarui. Kamu diberi tahu kalau utang mulai terlalu berat. Ada peringatan sebelum anggaran satu kategori jebol. Pengingat muncul saat tagihan jatuh tempo.",

        "work.sias.name": "Portal Sekolah",
        "work.sias.desc": "Portal akademik untuk sekolah dasar. Guru mengisi nilai, sementara admin mengurus data siswa dan SPP. Orang tua bisa melihat perkembangan anaknya dan sisa tagihannya. Coba masuk sebagai salah satu dari tiga peran itu. Demonya hanya bisa dibaca, jadi apa pun yang kamu lakukan tidak mengubah tampilan pengunjung berikutnya. Semua siswa di dalamnya fiktif.",
        "work.sias.live": "Coba demonya",

        "work.agency.name": "Situs Agensi Digital",
        "work.agency.desc": "Situs company profile untuk agensi digital. Isinya sebelas halaman: layanan, portofolio, tim, dan kontak. Pengunjung yang malas isi formulir bisa langsung chat lewat WhatsApp. Info apa pun yang dicari calon klien bisa ditemukan paling jauh tiga klik dari beranda. Seperti inilah situs yang biasa saya buat untuk klien, tinggal diganti brand-nya.",
        "work.agency.live": "Buka situsnya",

        "about.title": "Profil.",
        "about.p1": "Saya membuat software yang dipakai orang untuk kerja sehari-hari. Di Kyou, cakupannya dari pesanan masuk sampai barang dikirim. Mulai dari tools harga dan promo marketplace, pembayaran, dan laporan. Lalu aplikasi Android di gudang, pencetak label barang datang, dan bot yang menyambungkan semuanya. Polanya hampir selalu sama. Cari kerjaan yang masih dikerjakan manual, lalu ganti dengan sistem yang tidak tumbang saat sedang ramai.",
        "about.p2": "Sebelum menulis kode, saya bertahun-tahun bekerja di toko. Saya memimpin toko dan departemen, mengejar target penjualan, dan menjaga stok serta harga tetap akurat. Justru pengalaman itu yang bikin software saya benar-benar terpakai. Saya tahu di mana waktu kerja banyak terbuang, dan angka mana yang sudah tidak dipercaya orang. Saya juga paham kenapa layar yang benar secara teknis bisa tetap tidak berguna. Apalagi jam tujuh pagi, saat antrean mulai panjang.",
        "about.p3": "Saya mahasiswa Sistem Informasi, dan saya belajar dengan membangun hal yang benar-benar dipakai. Kalau kamu butuh orang yang paham lapangan sekaligus kodenya, ayo ngobrol.",
        "about.skills_title": "Teknologi yang saya pakai",
        "about.skill_ai": "AI engineering &amp; otomasi",
        "about.skill_qa": "Testing &amp; quality",
        "about.edu_title": "Pendidikan &amp; sertifikat",
        "about.edu_degree": "S.Tr Sistem Informasi Manajemen · 2023–2027",

        "act.title": "Kode &amp; aktivitas.",
        "act.intro": "Aktivitas GitHub publik saya enam bulan terakhir, plus ringkasan kerja saya di GitLab perusahaan.",
        "act.cal": "Kontribusi GitHub",
        "act.less": "Sedikit",
        "act.more": "Banyak",
        "act.private_title": "Yang tidak kelihatan di grafik",
        "act.private_body": "Sebagian besar kerjaan saya milik Kyou, jadi tersimpan di repo GitLab privat dan tidak muncul sebagai kotak hijau. Sejak bergabung pada Mei 2026:",
        "act.gl_pushes": "push ke repo perusahaan",
        "act.gl_role": "akses ke kode perusahaan",
        "act.gl_pda": "commit aplikasi gudang",
        "act.gl_platform": "kontributor platform utama",

        "exp.title": "Pengalaman.",
        "exp.present": "Sekarang",
        "exp.kyou.role": "Software Engineer",
        "exp.kyou.desc": "Saya membangun sistem e-commerce dan fulfillment Kyou. Cakupannya alat marketplace, pembayaran dan laporan, platform kantor, serta aplikasi Android di gudang. Sebagian besar kerjanya memindahkan proses dari spreadsheet atau admin PHP lama. Proses itu lalu saya bangun ulang jadi sistem yang bisa diandalkan. Saya pegang akses maintainer dan merilis perubahan saya sendiri ke production.",
        "exp.indie.role": "Developer Lepas",
        "exp.indie.desc": "Di luar kantor, saya menerima proyek sendiri. Saya merancang dan membangun website, aplikasi mobile, dan otomasi untuk klien. Proyeknya saya pegang dari obrolan pertama sampai jadi. Produk saya sendiri sejauh ini adalah Kasirin dan Itungin. Saat ini terbuka untuk proyek baru.",
        "exp.informa.role": "Assistant Product Specialist",
        "exp.informa.desc": "Menjalankan satu departemen setiap hari: akurasi harga, kampanye, stok, dan tata letak area jual. Semua target penjualan tercapai di tiga bulan pertama.",
        "exp.lion.role": "Game Tester &amp; Pengisi Suara Bahasa Indonesia",
        "exp.lion.desc": "Menguji game “Gems of War” dan melaporkan bug serta masalah tampilan yang saya temukan. Terpilih untuk proyek terkait Meta, merekam suara berbahasa Indonesia.",
        "exp.earlier.role": "Sebelumnya · retail",
        "exp.earlier.desc": "The Foodhall (2023–2024): menyusun laporan yang dipakai toko untuk mengambil keputusan, serta memantau penjualan, retur, dan stok. Indomaret Group (2019–2022): memimpin satu toko dan timnya setiap hari, dan beberapa kali mencapai target penjualan.",

        "contact.title": "Ayo ngobrol.",
        "contact.lead": "Ada lowongan, proses yang menghabiskan waktu tim, atau sesuatu yang ingin dibangun? Kirim pesan saja. Semuanya saya baca.",
        "contact.name": "Nama",
        "contact.email": "Email",
        "contact.message": "Ceritakan sedikit soal kebutuhanmu…",
        "contact.send": "Kirim pesan",

        "footer.top": "Kembali ke atas ↑"
    }
};

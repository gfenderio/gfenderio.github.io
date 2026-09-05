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
// ---------------------------------------------------------

const translations = {
    en: {
        "nav.work": "Work",
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.contact": "Contact",

        "hero.status": "Full Stack Developer @ Kyou — open to remote — Indonesia",
        "hero.title": "I build the software<br>that runs the work.",
        "hero.lead": "I&rsquo;m Gilang. I build the systems a company actually runs on — the app the warehouse staff carry all day, the platform the office works in, the tools that quietly do the jobs people used to do by hand. Four of them are in daily use right now.",
        "hero.cta_work": "See my work",
        "hero.cta_contact": "Get in touch",

        "work.title": "Selected work.",
        "work.intro": "Software people use every day, and products I designed and shipped on my own.",
        "work.gallery": "View screenshots",
        "work.live_tag": "Live",
        "work.wip_tag": "Still building",
        "work.prod_tag": "Used daily",

        "work.tier1": "Built at work · Kyou",
        "work.tier1_note": "The warehouse, delivery, and online-store teams use these every day. I describe them by what they do — the internal names and the code stay private.",
        "work.tier2": "My own products &amp; client work",

        "work.platform.name": "The Company&rsquo;s Working Platform",
        "work.platform.desc": "The company used to run on a pile of spreadsheets and one ageing admin page. I moved it into a single place, one piece at a time: stock, price changes, the stock rotation that used to live across three separate files, courier rates, payment confirmations. I build these end to end — the screens people use, the engine behind them, and the way the data is stored. I also built the sales dashboard the managers read every morning, a tool that turns an order number into a ready-to-print invoice, and the daily report the whole engineering team files into.",
        "work.platform.metric": "The largest share of the work, across a team of nine",

        "work.pda.name": "The Warehouse App",
        "work.pda.desc": "An Android app the warehouse staff carry all day: counting stock, picking orders, packing them, and checking in new deliveries. I built the barcode scanning through the phone camera, a stock count that starts from the shelf and asks for a photo as proof, and a check-in several people can work on at the same time without overwriting each other. One screen keeps working with no signal at all, because there are corners of the warehouse where there simply isn&rsquo;t any. Cost prices are deliberately left out: the floor staff get everything they need and nothing they shouldn&rsquo;t see.",
        "work.pda.metric": "About two thirds of the app is mine",

        "work.label.name": "The Goods-In Label Printer",
        "work.label.desc": "When a delivery arrives, some of it belongs on the shop shelves and some of it has already been bought by a customer. Both turn up in the same box, and mixing them up means somebody loses the thing they paid for. This desktop app reads what came in and prints a small sticker for each item that keeps the two apart — anything already sold gets its own mark and the buyer&rsquo;s reference, so it can&rsquo;t end up on a shelf by mistake. It only ever reads: it cannot change stock or orders, by design.",
        "work.label.metric": "25 releases, and it updates itself",

        "work.ops.name": "The Team&rsquo;s Ops Bot",
        "work.ops.desc": "A bot that keeps the team&rsquo;s day moving. An order stuck halfway through picking gets raised with whoever can unstick it, the moment it stalls. Proof photos from the warehouse app arrive on their own. A delivery booking nobody has picked up gets retried automatically. The recurring jobs run to schedule, without anyone having to remember them.",
        "work.ops.metric": "Running every day since May",

        "work.stzn.desc": "An online streetwear shop I designed and built from scratch. It is open and complete — you can browse it, put things in a basket, and pay, including by QRIS.",
        "work.stzn.live": "Visit live site",
        "work.kasirin.desc": "A checkout system for busy minimarkets with tens of thousands of products. The till keeps working when the internet drops, stock updates on every screen the moment something sells, and two cashiers can never sell the same last item twice. It also learns what runs out quickly and flags it before the shelf is empty.",
        "work.itungin.desc": "A personal money app for Android. It tracks what comes in and goes out on a live chart, tells you whether your debts are getting heavy, warns you before a spending category runs over budget, and reminds you when a bill is due.",

        "work.sias.name": "A School Portal",
        "work.sias.desc": "An academic portal for a primary school, not a brochure site. Teachers enter marks, admin manages pupil records and school fees, and parents see their own child’s progress and what is still owed. Sign in as any of the three roles and look around: the demo is read-only, so nothing you do changes what the next visitor sees, and every pupil in it is invented.",
        "work.sias.live": "Try the demo",

        "work.agency.name": "A Digital Agency Website",
        "work.agency.desc": "A company website for a digital agency: eleven pages covering services, past work, the team, and how to get in touch, with a WhatsApp shortcut for people who would rather not fill in a form. Built so that whatever a prospective client wants to know is never more than three clicks from the front page. This is the shape of website I build for clients, ready to be rebranded for one.",

        "work.agency.live": "Visit live site",

        "about.title": "About.",
        "about.p1": "I build software other people depend on to get through their working day. At Kyou that means four different systems: the platform the office works in, the Android app the warehouse carries, a desktop tool for goods coming in, and the bot that ties them together. The pattern is nearly always the same — find the job someone is still doing by hand, and replace it with something that holds up on a busy day.",
        "about.p2": "Before any of this I spent years on shop floors, running stores and departments, chasing sales targets, keeping stock and prices straight. That is not a detour on the way here — it is the reason the software works. I already knew where a business quietly loses hours, which numbers people have stopped trusting, and why a screen that is technically correct can still be useless at seven in the morning with a queue building.",
        "about.p3": "I&rsquo;m an Information Systems student, and I learn by building things that get used. If you want someone who understands the shop floor as well as the code, let&rsquo;s talk.",
        "about.skills_title": "What I work with",
        "about.skill_ai": "AI engineering &amp; automation",
        "about.skill_qa": "Testing &amp; quality",
        "about.edu_title": "Education &amp; credentials",
        "about.edu_degree": "B.Tech, Management Information Systems · 2023–2027",

        "act.title": "Code &amp; activity.",
        "act.intro": "My public GitHub activity over the last six months.",
        "act.cal": "GitHub contributions",
        "act.less": "Less",
        "act.more": "More",
        "act.private_title": "What this chart leaves out",
        "act.private_body": "Most of what I build belongs to the company I work for, so it lives in private repositories and never shows up here: the warehouse Android app, the platform the office runs on, a desktop tool, and the bot that connects them. Four systems, in daily use, none of them green squares.",

        "exp.title": "Experience.",
        "exp.present": "Present",
        "exp.kyou.role": "Full Stack Developer",
        "exp.kyou.desc": "I build and look after the platform the company runs on, the Android app used across the warehouse floor, and a desktop tool for handling deliveries. I contribute the largest share of the platform&rsquo;s code among a team of nine. Most of the work is moving things across: taking a process off a spreadsheet or an old admin page and rebuilding it as something people can rely on.",
        "exp.indie.role": "Freelance Developer",
        "exp.indie.desc": "My own practice. I design and build websites, mobile apps, and automation for clients, and I take a project from the first conversation to the finished thing. My own products so far are Kasirin and Itungin. Available for new work.",
        "exp.informa.role": "Assistant Product Specialist",
        "exp.informa.desc": "Ran a department day to day — pricing accuracy, campaigns, stock, and how the floor was laid out — and hit every sales target in my first three months.",
        "exp.lion.role": "Game Tester &amp; Indonesian Voice Specialist",
        "exp.lion.desc": "Tested &ldquo;Gems of War&rdquo;, wrote up the bugs and interface problems I found, and was picked for a Meta-related project recording Indonesian voice lines.",
        "exp.earlier.role": "Earlier — retail",
        "exp.earlier.desc": "The Foodhall (2023–2024): built the reports the store used to make decisions, and tracked sales, returns, and stock. Indomaret Group (2019–2022): ran a store and its team day to day, and hit the sales target on several occasions.",

        "contact.title": "Let&rsquo;s talk.",
        "contact.lead": "Got a job opening, a process that is eating your team&rsquo;s time, or something you want built? Send a message — I read every one.",
        "contact.name": "Name",
        "contact.email": "Email",
        "contact.message": "Tell me a bit about it…",
        "contact.send": "Send message",

        "footer.top": "Back to top ↑"
    },

    id: {
        "nav.work": "Karya",
        "nav.about": "Tentang",
        "nav.experience": "Pengalaman",
        "nav.contact": "Kontak",

        "hero.status": "Full Stack Developer @ Kyou · Terbuka untuk remote · Indonesia",
        "hero.title": "Saya membuat software<br>yang menjalankan pekerjaan.",
        "hero.lead": "Saya Gilang. Saya membangun sistem yang dipakai perusahaan untuk bekerja setiap hari. Aplikasi untuk staf gudang, platform untuk tim kantor, dan alat yang mengerjakan pekerjaan tangan. Empat di antaranya masih jalan sampai sekarang.",
        "hero.cta_work": "Lihat karya",
        "hero.cta_contact": "Hubungi saya",

        "work.title": "Karya pilihan.",
        "work.intro": "Software yang dipakai orang setiap hari, dan produk yang saya rilis sendiri.",
        "work.gallery": "Lihat tampilannya",
        "work.live_tag": "Sudah tayang",
        "work.wip_tag": "Masih digarap",
        "work.prod_tag": "Dipakai tiap hari",

        "work.tier1": "Dibuat di kantor · Kyou",
        "work.tier1_note": "Dipakai tim gudang, pengiriman, dan toko online setiap hari. Saya sebut berdasarkan fungsinya. Nama internal dan kodenya tetap privat.",
        "work.tier2": "Produk sendiri &amp; kerja klien",

        "work.platform.name": "Platform Kerja Perusahaan",
        "work.platform.desc": "Dulu perusahaan ini bergantung pada tumpukan spreadsheet dan satu halaman admin lama. Saya pindahkan semuanya ke satu tempat, bertahap. Data stok, perubahan harga, rotasi barang, ongkos kirim, sampai konfirmasi pembayaran. Rotasi barang tadinya tersebar di tiga file terpisah. Saya garap dari tampilan yang dilihat orang sampai cara datanya disimpan. Termasuk dashboard penjualan yang dibaca manajer tiap pagi. Ada juga alat yang mengubah nomor pesanan jadi invoice siap cetak, dan laporan harian yang diisi seluruh tim engineering.",
        "work.platform.metric": "Porsi pengerjaan terbesar, dari tim sembilan orang",

        "work.pda.name": "Aplikasi Gudang",
        "work.pda.desc": "Aplikasi Android yang dipegang staf gudang seharian. Dipakai menghitung stok, menyiapkan pesanan, mengemas, dan mencatat barang datang. Saya buat scan barcode lewat kamera HP. Hitung stok dimulai dari rak, lalu minta foto sebagai bukti. Pencatatan barang datang bisa digarap beberapa orang sekaligus tanpa bentrok. Satu layarnya tetap jalan walau sinyal hilang, karena di gudang memang ada sudut tanpa sinyal. Harga modal sengaja tidak ditampilkan. Staf lantai dapat semua yang mereka butuhkan, tanpa yang tidak perlu.",
        "work.pda.metric": "Kira-kira dua pertiga aplikasinya saya yang kerjakan",

        "work.label.name": "Pencetak Label Barang Datang",
        "work.label.desc": "Waktu barang datang, sebagian masuk rak toko dan sebagian sudah dibeli pelanggan. Keduanya tiba di kardus yang sama. Kalau tertukar, ada orang kehilangan barang yang sudah dibayar. Aplikasi desktop ini membaca isi kiriman, lalu mencetak stiker untuk tiap barang. Barang yang sudah laku dapat tanda sendiri berikut nomor pesanannya. Jadi tidak mungkin nyasar ke rak. Aplikasi ini hanya bisa membaca. Dari awal memang tidak diberi kemampuan mengubah stok atau pesanan.",
        "work.label.metric": "25 kali rilis, dan bisa memperbarui dirinya sendiri",

        "work.ops.name": "Bot Operasional Tim",
        "work.ops.desc": "Bot yang menjaga pekerjaan harian tim tetap jalan. Pesanan yang tersangkut langsung ditanyakan ke orang yang bisa membereskannya. Foto bukti dari aplikasi gudang masuk sendiri. Pesanan kurir yang tak kunjung dapat driver dicoba ulang otomatis. Tugas rutin berjalan sesuai jadwal, tanpa perlu ada yang mengingatkan.",
        "work.ops.metric": "Jalan setiap hari sejak Mei",

        "work.stzn.desc": "Toko streetwear online yang saya rancang dan bangun dari nol. Sudah tayang dan lengkap. Barang bisa dilihat, dimasukkan ke keranjang, lalu dibayar. Termasuk lewat QRIS.",
        "work.stzn.live": "Buka situsnya",
        "work.kasirin.desc": "Sistem kasir untuk minimarket ramai dengan puluhan ribu jenis barang. Kasir tetap jalan waktu internet putus. Stok berubah di semua layar begitu ada yang terjual. Dua kasir tidak mungkin menjual barang terakhir yang sama. Barang yang cepat habis ditandai sebelum raknya kosong.",
        "work.itungin.desc": "Aplikasi keuangan pribadi untuk Android. Uang masuk dan keluar tercatat lewat grafik yang langsung bergerak. Kesehatan utang kamu dinilai otomatis. Anggaran tiap kategori diingatkan sebelum kebobolan. Tagihan rutin ditagih tepat waktu.",

        "work.sias.name": "Portal Sekolah",
        "work.sias.desc": "Portal akademik untuk sekolah dasar, bukan sekadar situs profil. Guru mengisi nilai. Admin mengelola data siswa dan SPP. Wali murid melihat perkembangan anaknya sendiri, berikut tagihan yang belum lunas. Kamu bisa masuk sebagai salah satu dari tiga peran dan lihat-lihat sendiri. Demonya hanya bisa dibaca, jadi tidak ada yang berubah untuk pengunjung berikutnya, dan semua siswa di dalamnya fiktif.",
        "work.sias.live": "Coba demonya",

        "work.agency.name": "Situs Agensi Digital",
        "work.agency.desc": "Situs company profile untuk agensi digital. Sebelas halaman: layanan, karya, profil tim, dan cara menghubungi. Ada jalur pintas lewat WhatsApp buat yang malas mengisi form. Apa pun yang ingin diketahui calon klien tidak pernah lebih dari tiga klik dari halaman depan. Beginilah bentuk situs yang saya buat untuk klien.",

        "work.agency.live": "Buka situsnya",

        "about.title": "Tentang.",
        "about.p1": "Saya membuat software yang diandalkan orang lain untuk bekerja. Di Kyou itu berarti empat sistem berbeda. Platform untuk tim kantor, aplikasi Android untuk gudang, alat desktop untuk barang datang, dan bot yang menyambungkan semuanya. Polanya hampir selalu sama. Cari pekerjaan yang masih dikerjakan dengan tangan, lalu ganti dengan sesuatu yang kuat dipakai di hari sibuk.",
        "about.p2": "Sebelum ini saya bertahun-tahun di lapangan. Memimpin toko dan departemen, mengejar target penjualan, menjaga stok dan harga tetap benar. Itu bukan jalan memutar. Justru itu alasan software-nya bekerja. Saya sudah lebih dulu tahu di mana bisnis kehilangan waktu. Saya juga tahu angka mana yang diam-diam tidak dipercaya orang. Dan kenapa layar yang secara teknis benar bisa tetap tidak berguna jam tujuh pagi, saat antrean mulai mengular.",
        "about.p3": "Saya mahasiswa Sistem Informasi. Saya belajar dengan membuat hal yang benar-benar dipakai. Kalau kamu butuh orang yang paham lapangan sekaligus paham kodenya, mari mengobrol.",
        "about.skills_title": "Yang saya pakai",
        "about.skill_ai": "AI engineering &amp; automation",
        "about.skill_qa": "Testing &amp; kualitas",
        "about.edu_title": "Pendidikan &amp; sertifikat",
        "about.edu_degree": "S.Tr Sistem Informasi Manajemen · 2023–2027",

        "act.title": "Kode &amp; aktivitas.",
        "act.intro": "Aktivitas GitHub publik saya selama enam bulan terakhir.",
        "act.cal": "Kontribusi GitHub",
        "act.less": "Sedikit",
        "act.more": "Banyak",
        "act.private_title": "Yang tidak muncul di grafik ini",
        "act.private_body": "Sebagian besar yang saya buat milik perusahaan tempat saya bekerja. Kodenya tersimpan tertutup dan tidak pernah muncul di sini. Aplikasi Android untuk gudang, platform untuk tim kantor, satu alat desktop, dan bot yang menyambungkan semuanya. Empat sistem, dipakai tiap hari, tidak satu pun jadi kotak hijau.",

        "exp.title": "Pengalaman.",
        "exp.present": "Sekarang",
        "exp.kyou.role": "Full Stack Developer",
        "exp.kyou.desc": "Saya membuat dan merawat platform tempat perusahaan bekerja. Juga aplikasi Android yang dipakai di seluruh lantai gudang, dan alat desktop untuk barang datang. Porsi pengerjaan saya yang terbesar di platform itu, dari tim sembilan orang. Sebagian besar pekerjaannya adalah memindahkan. Satu proses dikeluarkan dari spreadsheet atau halaman admin lama, lalu dibangun ulang jadi sesuatu yang bisa diandalkan.",
        "exp.indie.role": "Developer Lepas",
        "exp.indie.desc": "Praktik mandiri saya. Saya merancang dan membangun website, aplikasi mobile, dan automasi untuk klien. Satu proyek saya pegang dari obrolan pertama sampai jadi. Produk sendiri sejauh ini: Kasirin dan Itungin. Terbuka untuk proyek baru.",
        "exp.informa.role": "Assistant Product Specialist",
        "exp.informa.desc": "Menjalankan satu departemen sehari-hari. Mengurus ketepatan harga, kampanye promo, alur stok, dan penataan barang di lantai. Seluruh target penjualan tercapai dalam tiga bulan pertama.",
        "exp.lion.role": "Game Tester &amp; Spesialis Suara Indonesia",
        "exp.lion.desc": "Menguji &ldquo;Gems of War&rdquo; dan menuliskan bug serta masalah tampilan yang saya temukan. Lalu terpilih untuk proyek terkait Meta yang merekam suara bahasa Indonesia.",
        "exp.earlier.role": "Sebelumnya · retail",
        "exp.earlier.desc": "The Foodhall (2023–2024): menyusun laporan yang dipakai toko untuk mengambil keputusan, serta memantau penjualan, retur, dan stok. Indomaret Group (2019–2022): menjalankan toko dan timnya sehari-hari, dan beberapa kali mencapai target penjualan.",

        "contact.title": "Mari bicara.",
        "contact.lead": "Punya lowongan, proses kerja yang menghabiskan waktu tim kamu, atau sesuatu yang ingin dibuat? Kirim pesan. Semuanya saya baca.",
        "contact.name": "Nama",
        "contact.email": "Email",
        "contact.message": "Ceritakan sedikit tentang proyeknya…",
        "contact.send": "Kirim pesan",

        "footer.top": "Kembali ke atas ↑"
    }
};

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
// Indonesian is localised, not translated — it should read
// like a person talking, not like a manual.
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

        "work.ops.name": "The Team&rsquo;s Automatic Assistant",
        "work.ops.desc": "The team coordinates its day in a group chat, so I put a helper in there. It sits between the chat and everything else the company already runs, and it speaks up when something needs a person: an order stuck halfway through picking gets raised with whoever can unstick it, right in the channel. It also collects proof photos from the warehouse app, chases up a delivery booking when no driver takes it, and remembers the recurring things nobody should have to remember.",
        "work.ops.metric": "Running every day since May",

        "work.stzn.desc": "An online streetwear shop I designed and built from scratch. It is open and complete — you can browse it, put things in a basket, and pay, including by QRIS.",
        "work.stzn.live": "Visit live site",
        "work.kasirin.desc": "A checkout system for busy minimarkets with tens of thousands of products. The till keeps working when the internet drops, stock updates on every screen the moment something sells, and two cashiers can never sell the same last item twice. It also learns what runs out quickly and flags it before the shelf is empty.",
        "work.itungin.desc": "A personal money app for Android. It tracks what comes in and goes out on a live chart, tells you whether your debts are getting heavy, warns you before a spending category runs over budget, and reminds you when a bill is due.",

        "work.agency.name": "A Digital Agency Website",
        "work.agency.desc": "A company website for a digital agency: eleven pages covering services, past work, the team, and how to get in touch, with a WhatsApp shortcut for people who would rather not fill in a form. Built so that whatever a prospective client wants to know is never more than three clicks from the front page. This is the shape of website I build for clients, ready to be rebranded for one.",

        "about.title": "About.",
        "about.p1": "I build software other people depend on to get through their working day. At Kyou that means four different systems: the platform the office works in, the Android app the warehouse carries, a desktop tool for goods coming in, and the helper that ties them together. The pattern is nearly always the same — find the job someone is still doing by hand, and replace it with something that holds up on a busy day.",
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
        "act.private_body": "Most of what I build belongs to the company I work for, so it lives in private repositories and never shows up here: the warehouse Android app, the platform the office runs on, a desktop tool, and the assistant that connects them. Four systems, in daily use, none of them green squares.",

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

        "hero.status": "Full Stack Developer @ Kyou — terbuka untuk remote — Indonesia",
        "hero.title": "Saya membuat software<br>yang menjalankan pekerjaan.",
        "hero.lead": "Saya Gilang. Saya membuat sistem yang benar-benar dipakai perusahaan untuk bekerja — aplikasi yang dipegang staf gudang seharian, platform tempat tim kantor bekerja, dan alat-alat yang diam-diam mengerjakan hal yang dulu dikerjakan orang satu per satu. Empat di antaranya dipakai setiap hari sampai sekarang.",
        "hero.cta_work": "Lihat karya",
        "hero.cta_contact": "Hubungi saya",

        "work.title": "Karya pilihan.",
        "work.intro": "Software yang dipakai orang setiap hari, dan produk yang saya rancang serta rilis sendiri.",
        "work.gallery": "Lihat tampilannya",
        "work.live_tag": "Sudah tayang",
        "work.wip_tag": "Masih digarap",
        "work.prod_tag": "Dipakai tiap hari",

        "work.tier1": "Dibuat di kantor · Kyou",
        "work.tier1_note": "Dipakai tim gudang, pengiriman, dan toko online setiap hari. Saya sebut berdasarkan fungsinya — nama internal dan kodenya tetap privat.",
        "work.tier2": "Produk sendiri &amp; kerja klien",

        "work.platform.name": "Platform Kerja Perusahaan",
        "work.platform.desc": "Dulu perusahaan ini berjalan di atas tumpukan spreadsheet dan satu halaman admin yang sudah uzur. Saya pindahkan ke satu tempat, sepotong demi sepotong: data stok, perubahan harga, rotasi barang yang tadinya tersebar di tiga file terpisah, ongkos kirim, sampai konfirmasi pembayaran. Saya kerjakan dari ujung ke ujung — tampilan yang dilihat orang, mesin di belakangnya, dan cara datanya disimpan. Termasuk dashboard penjualan yang dibaca manajer tiap pagi, alat yang mengubah nomor pesanan jadi invoice siap cetak, dan laporan harian yang diisi seluruh tim engineering.",
        "work.platform.metric": "Porsi pengerjaan terbesar, dari tim sembilan orang",

        "work.pda.name": "Aplikasi Gudang",
        "work.pda.desc": "Aplikasi Android yang dipegang staf gudang seharian: menghitung stok, menyiapkan pesanan, mengemas, dan mencatat barang yang baru datang. Saya buat pemindai barcode lewat kamera HP, alur hitung stok yang dimulai dari rak dan meminta foto sebagai bukti, serta pencatatan barang datang yang bisa dikerjakan beberapa orang sekaligus tanpa saling menimpa. Satu layarnya tetap jalan walau sinyal hilang sama sekali, karena di gudang memang ada sudut yang tidak dapat sinyal. Harga modal sengaja tidak ditampilkan: staf lantai dapat semua yang mereka butuhkan, tanpa yang tidak perlu mereka lihat.",
        "work.pda.metric": "Kira-kira dua pertiga aplikasinya saya yang kerjakan",

        "work.label.name": "Pencetak Label Barang Datang",
        "work.label.desc": "Waktu barang datang, sebagian masuk rak toko dan sebagian lagi sudah dibeli pelanggan. Keduanya tiba di kardus yang sama, dan kalau tertukar, ada orang yang kehilangan barang yang sudah dia bayar. Aplikasi desktop ini membaca apa saja yang masuk, lalu mencetak stiker kecil untuk tiap barang supaya keduanya tidak campur — yang sudah laku dapat tanda sendiri berikut nomor pesanannya, jadi tidak mungkin nyasar ke rak. Aplikasi ini cuma bisa membaca: dari awal memang tidak diberi kemampuan mengubah stok atau pesanan.",
        "work.label.metric": "25 kali rilis, dan bisa memperbarui dirinya sendiri",

        "work.ops.name": "Asisten Otomatis Tim",
        "work.ops.desc": "Tim mengatur pekerjaan sehari-hari lewat grup chat, jadi saya taruh satu asisten di sana. Dia duduk di antara grup itu dan semua sistem lain yang sudah dipakai perusahaan, lalu bersuara kalau ada yang butuh orang: pesanan yang tersangkut di tengah jalan langsung ditanyakan ke orang yang bisa membereskannya, di grup itu juga. Dia juga menampung foto bukti dari aplikasi gudang, mengejar pesanan kurir kalau tidak ada driver yang mengambil, dan mengingat hal-hal rutin yang tidak seharusnya perlu diingat orang.",
        "work.ops.metric": "Jalan setiap hari sejak Mei",

        "work.stzn.desc": "Toko streetwear online yang saya rancang dan bangun dari nol. Sudah tayang dan lengkap — bisa dilihat-lihat, dimasukkan ke keranjang, lalu dibayar, termasuk lewat QRIS.",
        "work.stzn.live": "Buka situsnya",
        "work.kasirin.desc": "Sistem kasir untuk minimarket ramai dengan puluhan ribu jenis barang. Kasirnya tetap jalan waktu internet putus, stok langsung berubah di semua layar begitu ada yang terjual, dan dua kasir tidak mungkin menjual barang terakhir yang sama. Dia juga belajar barang mana yang cepat habis, lalu mengingatkan sebelum raknya kosong.",
        "work.itungin.desc": "Aplikasi keuangan pribadi untuk Android. Mencatat uang masuk dan keluar lewat grafik yang langsung bergerak, memberi tahu apakah utang Anda mulai memberatkan, mengingatkan sebelum anggaran per kategori kebobolan, dan menagih Anda saat ada tagihan jatuh tempo.",

        "work.agency.name": "Situs Agensi Digital",
        "work.agency.desc": "Situs company profile untuk agensi digital: sebelas halaman berisi layanan, karya, profil tim, dan cara menghubungi, ditambah jalur pintas lewat WhatsApp buat yang malas mengisi form. Dirancang supaya apa pun yang ingin diketahui calon klien tidak pernah lebih dari tiga klik dari halaman depan. Beginilah bentuk situs yang saya buat untuk klien, dan sudah siap dipakai ulang dengan merek lain.",

        "about.title": "Tentang.",
        "about.p1": "Saya membuat software yang diandalkan orang lain untuk melewati hari kerjanya. Di Kyou itu berarti empat sistem berbeda: platform tempat tim kantor bekerja, aplikasi Android yang dibawa staf gudang, alat desktop untuk barang datang, dan asisten yang menyambungkan semuanya. Polanya hampir selalu sama — cari pekerjaan yang masih dikerjakan dengan tangan, lalu ganti dengan sesuatu yang kuat dipakai di hari sibuk.",
        "about.p2": "Sebelum semua ini, saya bertahun-tahun di lapangan: memimpin toko dan departemen, mengejar target penjualan, menjaga stok dan harga tetap benar. Itu bukan jalan memutar menuju ke sini — justru itu alasan software-nya bekerja. Saya sudah lebih dulu tahu di mana sebuah bisnis diam-diam kehilangan waktu, angka mana yang sudah tidak dipercaya orang, dan kenapa layar yang secara teknis benar bisa tetap tidak berguna pada jam tujuh pagi saat antrean mulai mengular.",
        "about.p3": "Saya mahasiswa Sistem Informasi, dan saya belajar dengan membuat hal yang benar-benar dipakai. Kalau Anda butuh orang yang paham lapangan sekaligus paham kodenya, mari mengobrol.",
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
        "act.private_body": "Sebagian besar yang saya buat adalah milik perusahaan tempat saya bekerja, jadi tersimpan di repositori tertutup dan tidak pernah muncul di sini: aplikasi Android untuk gudang, platform tempat tim kantor bekerja, satu alat desktop, dan asisten yang menyambungkan semuanya. Empat sistem, dipakai tiap hari, dan tidak satu pun jadi kotak hijau.",

        "exp.title": "Pengalaman.",
        "exp.present": "Sekarang",
        "exp.kyou.role": "Full Stack Developer",
        "exp.kyou.desc": "Saya membuat dan merawat platform tempat perusahaan bekerja, aplikasi Android yang dipakai di seluruh lantai gudang, dan alat desktop untuk menangani barang datang. Porsi pengerjaan saya yang terbesar di platform itu, dari tim sembilan orang. Sebagian besar pekerjaannya adalah memindahkan: mengeluarkan satu proses dari spreadsheet atau halaman admin lama, lalu membangunnya ulang jadi sesuatu yang bisa diandalkan orang.",
        "exp.indie.role": "Developer Lepas",
        "exp.indie.desc": "Praktik mandiri saya. Saya merancang dan membangun website, aplikasi mobile, dan automasi untuk klien, dan saya pegang sebuah proyek dari obrolan pertama sampai jadi. Produk sendiri sejauh ini: Kasirin dan Itungin. Terbuka untuk proyek baru.",
        "exp.informa.role": "Assistant Product Specialist",
        "exp.informa.desc": "Menjalankan satu departemen sehari-hari — ketepatan harga, kampanye promo, alur stok, dan penataan barang di lantai — sekaligus mencapai seluruh target penjualan dalam tiga bulan pertama.",
        "exp.lion.role": "Game Tester &amp; Spesialis Suara Indonesia",
        "exp.lion.desc": "Menguji &ldquo;Gems of War&rdquo;, menuliskan bug dan masalah tampilan yang saya temukan, lalu terpilih untuk proyek terkait Meta yang merekam suara bahasa Indonesia.",
        "exp.earlier.role": "Sebelumnya — retail",
        "exp.earlier.desc": "The Foodhall (2023–2024): menyusun laporan yang dipakai toko untuk mengambil keputusan, serta memantau penjualan, retur, dan stok. Indomaret Group (2019–2022): menjalankan toko dan timnya sehari-hari, dan beberapa kali mencapai target penjualan.",

        "contact.title": "Mari bicara.",
        "contact.lead": "Punya lowongan, proses kerja yang menghabiskan waktu tim Anda, atau sesuatu yang ingin dibuat? Kirim pesan — semuanya saya baca.",
        "contact.name": "Nama",
        "contact.email": "Email",
        "contact.message": "Ceritakan sedikit tentang proyeknya…",
        "contact.send": "Kirim pesan",

        "footer.top": "Kembali ke atas ↑"
    }
};

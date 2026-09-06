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
        "work.wip_tag": "Live",
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

        "work.ops.name": "The Fulfilment Bot",
        "work.ops.desc": "A bot that carries fulfilment between the warehouse and the people running it. Proof photos follow every order through picking, packing, and handover, and file themselves where they belong. Split shipments are worked out and sent to print without anyone chasing the paperwork. An order stuck halfway through picking is raised with whoever can unstick it, the moment it stalls. The recurring jobs run to schedule, without anyone having to remember them.",
        "work.ops.metric": "Running every day since May",

        "work.vault.desc": "A luxury, high-end Yu-Gi-Oh! TCG physical card showcase and personal archive. Designed with an anti-generic dark aesthetic, museum-grade lighting, and realistic physical simulations including custom 3D holographic layers and animated foil textures for each card rarity.",
        "work.vault.live": "Visit the gallery",

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
        "nav.about": "Profil",
        "nav.experience": "Pengalaman",
        "nav.contact": "Kontak",

        "hero.status": "Full Stack Developer @ Kyou · Siap kerja remote · Indonesia",
        "hero.title": "Saya membuat software<br>penggerak bisnis.",
        "hero.lead": "Saya Gilang. Membangun sistem andalan operasional perusahaan harian. Aplikasi untuk staf gudang, platform tim kantor, dan alat pengganti pekerjaan manual. Empat di antaranya menjadi tulang punggung harian.",
        "hero.cta_work": "Lihat karya",
        "hero.cta_contact": "Hubungi saya",

        "work.title": "Karya pilihan.",
        "work.intro": "Software harian andalan pekerja, serta jajaran produk rilis mandiri saya.",
        "work.gallery": "Lihat tampilannya",
        "work.live_tag": "Bisa diakses",
        "work.wip_tag": "Bisa diakses",
        "work.prod_tag": "Dipakai harian",

        "work.tier1": "Proyek Perusahaan · Kyou",
        "work.tier1_note": "Sengaja saya jabarkan murni berdasarkan fungsinya. Sistem ini menghidupi tim gudang, kurir pengiriman, dan operasional toko online. Nama internal beserta kode sumbernya wajib dirahasiakan.",
        "work.tier2": "Produk Mandiri & Klien",

        "work.platform.name": "Platform Kerja Perusahaan",
        "work.platform.desc": "Dulu perusahaan ini bergantung penuh pada lautan spreadsheet dan satu layar admin usang. Semuanya saya satukan bertahap ke dalam satu platform. Mencakup pergerakan data stok, ongkos kirim, hingga verifikasi pembayaran mutlak. Menyatukan data rotasi barang yang tadinya berserakan di tiga file terpisah. Menggarap utuh tampilan antarmuka hingga merancang sistem penyimpanan datanya. Menciptakan fitur penyulap nomor pesanan menjadi invoice rapi siap cetak. Tersedia pula laporan harian untuk diisi oleh seluruh tim engineering.",
        "work.platform.metric": "Memegang porsi kontribusi kode terbesar di dalam tim sembilan orang",

        "work.pda.name": "Aplikasi Gudang",
        "work.pda.desc": "Aplikasi Android yang tak pernah lepas dari genggaman staf gudang. Memfasilitasi perhitungan stok, penyiapan pesanan, pengemasan, dan pencatatan kargo datang. Menyematkan pemindai barcode kilat berbasis kamera HP standar. Mewajibkan alur hitung stok dari rak fisik berikut unggahan foto buktinya. Pencatatan kiriman datang bisa dikeroyok beberapa orang sekaligus tanpa bentrok data. Satu layarnya dirancang tetap hidup walau sinyal terputus. Mengingat banyak sudut gudang yang sama sekali tidak tersentuh sinyal. Memblokir ketat akses ke harga modal. Staf lapangan murni melihat data relevan.",
        "work.pda.metric": "Merangkai sekitar dua pertiga dari keseluruhan kode aplikasi ini",

        "work.label.name": "Pencetak Label Barang Masuk",
        "work.label.desc": "Barang pasokan toko dan pesanan klien sering kali tiba bertumpuk dalam satu kardus. Pelanggan bisa kehilangan barang bayarannya jika sampai tertukar. Aplikasi desktop ini memindai isi kiriman lalu memuntahkan stiker identifikasi otomatis. Barang laku langsung mendapat tanda khusus berserta nomor pesanannya. Sehingga mustahil salah alamat meluncur ke rak toko. Aplikasi ini bersifat mutlak hanya baca. Sengaja didesain tanpa akses mengubah tatanan data stok atau pesanan.",
        "work.label.metric": "Sudah 25 kali rilis, lengkap dengan fitur pembaruan otomatis",

        "work.ops.name": "Bot Fulfillment",
        "work.ops.desc": "Bot pengantar aliran data fulfillment antara sistem gudang dan staf operasional. Mengikat erat setiap foto bukti ke dalam pesanannya masing-masing. Mulai tahap pengambilan, pengemasan, hingga penyerahan kurir akhir. Menyortir setiap arsip otomatis masuk ke sarangnya masing-masing. Sistem menghitung pembagian kiriman lalu memicu mesin cetak. Staf tidak perlu lagi pusing melacak keberadaan dokumen fisik. Langsung menginterogasi pihak terkait jika mendeteksi pesanan tersendat. Menjalankan serangkaian tugas rutin tepat berpacu jadwal.",
        "work.ops.metric": "Beroperasi aktif tanpa henti setiap hari sejak bulan Mei",

        "work.vault.desc": "Galeri pameran sekaligus arsip pribadi koleksi kartu Yu-Gi-Oh! kelas atas. Berbalut estetika gelap eksklusif tanpa campur tangan templat instan. Antarmukanya secara akurat mensimulasikan tata pencahayaan dramatis ruangan museum. Kartu terasa layaknya benda fisik berkat manipulasi efek 3D interaktif. Lengkap dengan pendaran kilau hologram unik bagi setiap tingkat kelangkaan.",
        "work.vault.live": "Kunjungi galeri",

        "work.stzn.desc": "Toko streetwear online yang saya rancang dan bangun dari nol. Situs ini sudah rilis dan beroperasi sepenuhnya fungsional. Pengunjung bisa menelusuri katalog, mengisi keranjang, dan langsung menuntaskan pembayaran. Telah mendukung secara penuh integrasi pembayaran instan via QRIS.",
        "work.stzn.live": "Buka situsnya",
        "work.kasirin.desc": "Sistem kasir minimarket super ramai penampung puluhan ribu jenis barang. Memastikan kasir tetap hidup beroperasi meski koneksi internet terputus. Menyinkronkan perubahan data stok di semua terminal seketika saat penjualan. Mencegah dua kasir berpotensi memperebutkan barang terakhir yang sama persis. Menandai otomatis barang laris manis sebelum rak memajangnya bolong melompong.",
        "work.itungin.desc": "Aplikasi keuangan pribadi mandiri untuk platform Android. Mencatat arus kas masuk dan keluar secara visual melalui grafik real-time. Memantau ketat seberapa gawat tingkat rasio beban utangmu. Memberi peringatan dini sebelum anggaran per kategori terlanjur jebol kebobolan. Mengingatkan secara proaktif begitu tagihan bulanan jatuh tempo.",

        "work.sias.name": "Portal Sekolah",
        "work.sias.desc": "Portal akademik sekolah dasar, murni melampaui fungsi situs profil biasa. Memberi akses guru untuk langsung menginput deretan nilai akademis. Admin bertugas mengelola integritas data siswa beserta pembayaran setoran SPP. Membiarkan wali murid memantau rapor anak sekaligus menagih sisa tunggakan. Kamu dipersilakan login masuk untuk menjajal salah satu dari tiga peran. Demonya bersifat read-only terkunci mutlak. Tidak ada kepingan data yang berubah untuk pengunjung berikutnya. Seluruh entitas siswa di dalamnya murni rekayasa fiktif belaka.",
        "work.sias.live": "Coba demonya",

        "work.agency.name": "Situs Agensi Digital",
        "work.agency.desc": "Situs company profile utuh dan bertenaga bagi sebuah agensi digital. Memuat sebelas halaman utuh: dari layanan, portofolio, hingga detail kontak. Menyediakan jalur pintas WhatsApp bagi pengunjung yang enggan mengisi formulir. Memastikan info apa pun bagi calon klien maksimal berjarak tiga klik. Inilah cetak biru situs terkalibrasi yang biasa saya rancang untuk klien.",

        "work.agency.live": "Buka situsnya",

        "about.title": "Profil.",
        "about.p1": "Membangun barisan software andalan penggerak roda operasional karyawan harian. Di Kyou, saya memegang kendali penuh empat sistem raksasa berbeda. Mulai dari platform komando tim kantor hingga aplikasi Android staf gudang. Dilengkapi alat desktop penerimaan barang serta satu bot orkestrator mutlak. Polanya selalu berulang dari waktu ke waktu. Memburu setiap celah pekerjaan fisik yang masih dijalankan manual. Lalu menggantikannya dengan sistem baja penembus hari-hari super sibuk.",
        "about.p2": "Menghabiskan waktu bertahun-tahun di lantai lapangan sebelum mulai merangkai baris kode. Memimpin jalannya toko, mengejar target penjualan, serta memastikan presisi akurasi stok. Pengalaman fisik berdarah-darah itu sama sekali tidak menguap sia-sia. Justru itulah rahasia pamungkas mengapa sistem buatan saya benar-benar terpakai. Sangat paham di titik buta mana sebuah bisnis menguapkan sisa waktunya. Tahu persis deretan angka mana yang diam-diam dicurigai manipulatif oleh banyak pihak. Mengerti mengapa sistem yang secara teknis beres bisa mendadak tidak berguna. Terutama di titik buta jam tujuh pagi saat rentetan antrean mulai mengular.",
        "about.p3": "Mahasiswa Sistem Informasi yang rutin belajar lewat merakit produk fungsional. Jika kamu mencari eksekutor yang fasih membaca lapangan sekaligus meracik kode. Mari kita duduk dan mengobrol.",
        "about.skills_title": "Tumpukan Teknologi",
        "about.skill_ai": "AI engineering &amp; automation",
        "about.skill_qa": "Testing &amp; penjagaan mutu",
        "about.edu_title": "Pendidikan &amp; kredensial",
        "about.edu_degree": "S.Tr Sistem Informasi Manajemen · 2023–2027",

        "act.title": "Kode &amp; aktivitas.",
        "act.intro": "Rekam jejak aktivitas GitHub publik saya selama enam bulan terakhir.",
        "act.cal": "Kontribusi GitHub",
        "act.less": "Sedikit",
        "act.more": "Banyak",
        "act.private_title": "Yang tidak terpetakan di grafik ini",
        "act.private_body": "Sebagian besar produk ciptaan saya bernaung di bawah hak milik perusahaan. Segenap kodenya tersimpan rapat dan tidak akan pernah terpublikasi di sini. Meliputi aplikasi Android gudang, platform tim kantor, serta alat desktop. Dan tidak lupa bot pengikat yang secara harian menyambungkan ketiganya. Empat sistem andalan pekerja harian. Namun tak satu pun sudi menyumbang kotak hijau GitHub.",

        "exp.title": "Pengalaman.",
        "exp.present": "Sekarang",
        "exp.kyou.role": "Full Stack Developer",
        "exp.kyou.desc": "Membangun sekaligus merawat platform pusat pengendali operasional harian perusahaan. Merancang utuh aplikasi Android penunjang lantai gudang, beserta alat desktop barang masuk. Memegang takhta porsi kontribusi kode terbesar dari sembilan orang anggota tim. Fokus utamanya senantiasa memigrasi dan merombak tuntas sistem-sistem usang purba. Mencabut satu per satu proses rentan dari spreadsheet dan halaman admin lawas. Lalu merangkainya ulang menjadi pilar baja sistem yang pantang tumbang.",
        "exp.indie.role": "Developer Lepas",
        "exp.indie.desc": "Jalur praktik profesional mandiri sekaligus wadah asah logika desain saya. Merancang utuh sekaligus membangun website, aplikasi mobile, serta automasi sistem klien. Mengawal ketat eksekusi setiap proyek mulai obrolan pertama hingga rilis layar final. Produk mandiri yang telah meroket sejauh ini adalah Kasirin dan Itungin. Saat ini terbuka sangat lebar untuk mengeksekusi visi proyek baru.",
        "exp.informa.role": "Assistant Product Specialist",
        "exp.informa.desc": "Memimpin dan memutar roda operasional harian satu departemen secara penuh mutlak. Mengawal ketepatan harga, kampanye promo, alur perputaran stok, hingga penataan visual panggung toko. Berhasil mengunci dan melampaui seluruh teror target penjualan dalam waktu tiga bulan perdana.",
        "exp.lion.role": "Game Tester &amp; Pengisi Suara",
        "exp.lion.desc": "Menguji level ekstrim “Gems of War” seraya mendokumentasikan setiap bug dan anomali tampilan. Berhasil menembus dan terpilih dalam proyek rahasia Meta guna merekam bank suara bahasa Indonesia.",
        "exp.earlier.role": "Sebelumnya · retail",
        "exp.earlier.desc": "The Foodhall (2023–2024): Menyusun rumusan laporan penentu arah bagi sang pengambil keputusan toko. Memantau tajam penjualan, pergerakan retur, serta kelancaran distribusi alur stok. Indomaret Group (2019–2022): Memimpin operasional satu gerai toko beserta timnya secara total tanpa kompromi. Tercatat sukses berkali-kali melibas dan mengungguli ambang target penjualan harian.",

        "contact.title": "Mari bicara.",
        "contact.lead": "Punya posisi kosong, proses usang pelahap waktu tim, atau ide produk digital segar? Kirimkan rentetan pesannya ke sini. Semuanya pasti saya baca habis.",
        "contact.name": "Nama",
        "contact.email": "Email",
        "contact.message": "Ceritakan sedikit kerangka proyeknya…",
        "contact.send": "Kirim pesan",

        "footer.top": "Kembali ke atas ↑"
    }
};

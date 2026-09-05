// ---------------------------------------------------------
// EN / ID copy. English is the HTML default; these keys keep
// both languages in sync. Tone & rules: see skills.md.
// Indonesian is localized, not literally translated — standard
// tech terms stay in English where that reads more naturally.
//
// Kyou systems are described by function, not by internal
// codename or repository. Contribution figures come from git
// and are safe to state publicly.
// ---------------------------------------------------------

const translations = {
    en: {
        "nav.work": "Work",
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.contact": "Contact",

        "hero.status": "Full Stack Developer @ Kyou — open to remote — Indonesia",
        "hero.title": "I build full-stack systems<br>that replace manual work.",
        "hero.lead": "I&rsquo;m Gilang, a full-stack developer at Kyou. I build the platform, the Android app, and the desktop client that its warehouse and e-commerce teams use every day — Go and React on the server, Kotlin on the warehouse floor. Most of what I ship replaces something manual: a spreadsheet, a legacy admin panel, a job somebody used to do by hand.",
        "hero.cta_work": "See my work",
        "hero.cta_contact": "Get in touch",

        "work.title": "Selected work.",
        "work.intro": "Systems running in production, and products I designed and shipped on my own.",
        "work.gallery": "View screenshots",
        "work.live_tag": "Live",
        "work.wip_tag": "In progress",
        "work.prod_tag": "In production",

        "work.tier1": "Production systems · Kyou",
        "work.tier1_note": "Internal systems used daily by warehouse, fulfillment, and e-commerce teams. Named by function — internal codenames and source stay private. Contribution figures come from git.",
        "work.tier2": "Products &amp; client work",

        "work.platform.name": "Team Operations Platform",
        "work.platform.desc": "The company ran on a legacy admin panel and a wall of spreadsheets. I moved it onto one platform, piece by piece — stock management, price changes, stock rotation that used to live across three separate sheets, courier tariffs, payment confirmation. I work across the whole stack here: Go services, the React front end, and the Postgres migrations underneath. I also built the GOLD reporting layer behind the sales dashboard, a B2B invoice generator that turns an order ID into a printable PDF, and the daily worklog module the engineering team files into.",
        "work.platform.metric": "1,012 commits · top contributor of nine",

        "work.pda.name": "Warehouse PDA App",
        "work.pda.desc": "A native Android app the warehouse floor runs on all day: stock-taking, picking, packing, and goods-in. I built the camera barcode scanning, a rack-first stock-take flow with photo proof, and an arrival roll-call where several staff can work one batch at once — item-level locking and 7-second polling keep them from colliding. The event-stock screen works with no signal at all, because the warehouse has corners where nothing does. Item lookup deliberately withholds cost price: floor staff get everything they need and nothing they shouldn&rsquo;t see.",
        "work.pda.metric": "267 of 425 commits · 51k lines of Kotlin",

        "work.label.name": "Arrival Label Client",
        "work.label.desc": "When stock arrives, some units belong on shelves and some belong to orders a customer already paid for. They arrive in the same box, and mixing them up costs somebody their order. This Windows client reads arrival logs and prints 33&times;19mm thermal labels that keep the two apart — pre-sold units carry their own tag and buyer reference so allocation can&rsquo;t confuse them. It is read-only by design: it never writes to stock, orders, or allocation. The same roll-call I built for the phones, moved to a PC with a USB scanner, because bulk work is faster on a keyboard.",
        "work.label.metric": "25 tagged releases · auto-updating in the field",

        "work.ops.name": "Ops Automation Service",
        "work.ops.desc": "The layer between the systems the team already runs — admin panel, warehouse handhelds, spreadsheets, Metabase, Notion — and Discord, where the work actually gets coordinated. It notices orders stuck in picking and asks the person who can unstick them, right in the channel. It takes photo proof and item batches straight from the handhelds. A browser extension watches driver bookings and retries when none is found. Schedulers handle the recurring things nobody should have to remember.",
        "work.ops.metric": "~16,600 lines · Node.js &amp; TypeScript",

        "work.stzn.desc": "A drop-based streetwear storefront I designed and built on Next.js, live and complete — including checkout through a Midtrans payment gateway with QRIS support.",
        "work.stzn.live": "Visit live site",
        "work.kasirin.desc": "An offline-first POS engineered for high-traffic minimarkets (50k+ SKUs). Checkout keeps running when the connection drops, inventory streams in real time over SSE, and atomic transactions block overselling. A Brain.js model flags restocks before stock runs out.",
        "work.itungin.desc": "A mobile-first personal finance app, built React-first and shipped to Android with Capacitor. Tracks cash flow with live charts, scores debt health with a debt-to-income indicator, enforces category budgets with real-time warnings, and reminds you of recurring bills.",

        "work.agency.name": "Agency Company Profile",
        "work.agency.desc": "A company profile site for a digital agency: eleven pages covering services, case studies, team, and contact, with scroll animations and a WhatsApp enquiry route for clients who would rather not fill in a form. Built around a three-click rule — any question a prospect might have is at most three clicks from the homepage. This is the shape of marketing site I build for clients, and it is ready to be rebranded for one.",

        "about.title": "About.",
        "about.p1": "I build software that other people depend on to get through their working day. At Kyou that means four codebases and four languages: a Go and React platform, a Kotlin Android app for the warehouse floor, an Electron desktop client, and a Node service that ties them together. The pattern behind most of it is the same — find the job someone is still doing by hand, and replace it with something that holds up under a real workload.",
        "about.p2": "Before any of that, I spent years running retail floors: store and department operations, sales targets, inventory and pricing accuracy. That is not a detour on the way here — it is the reason the software works. I already knew where a business bleeds time, which numbers people quietly distrust, and why a screen that is technically correct can still be useless at 7am with a queue forming.",
        "about.p3": "I&rsquo;m an Information Systems student who learns by shipping, and the work is real and running in production. If you need someone who reads both the shop floor and the codebase, let&rsquo;s talk.",
        "about.skills_title": "What I work with",
        "about.skill_ai": "AI engineering &amp; automation",
        "about.skill_qa": "QA &amp; testing",
        "about.edu_title": "Education &amp; credentials",
        "about.edu_degree": "B.Tech, Management Information Systems · 2023–2027",

        "act.title": "Code &amp; activity.",
        "act.intro": "A live look at my GitHub contributions over the last 6 months. Most of my day job lives on a private GitLab, so this is only part of the picture.",
        "act.cal": "GitHub contributions",
        "act.less": "Less",
        "act.more": "More",
        "act.private_title": "What the graph doesn&rsquo;t show",
        "act.private_body": "Most of what I build sits in private company repositories: an Android app the warehouse floor runs on, a Go and React platform, a Windows desktop client, and the service that ties them together. Four codebases, four languages, all in production — and none of them turn this calendar green.",

        "exp.title": "Experience.",
        "exp.present": "Present",
        "exp.kyou.role": "Full Stack Developer",
        "exp.kyou.desc": "Build and maintain the internal platform the company runs on — Go services, a React front end, and the Postgres schema underneath — plus the Android app used on the warehouse floor and a Windows client for goods-in. Top contributor on the platform with 1,012 commits, and 63% of the Android app. Most of the work is migration: taking processes off spreadsheets and a legacy admin panel and rebuilding them as systems people can trust.",
        "exp.indie.role": "Freelance Full-Stack Developer",
        "exp.indie.desc": "My own practice — I design and ship web apps, mobile apps, and automation for clients, and I take on new builds end to end. Self-initiated products so far include Kasirin and Itungin, built with Next.js, React, and TypeScript. Available for new work.",
        "exp.informa.role": "Assistant Product Specialist",
        "exp.informa.desc": "Oversaw department-level operations — pricing accuracy, campaign alignment, inventory workflows, and visual merchandising — and hit 100% of sales targets in the first three months through strong product knowledge and customer service.",
        "exp.lion.role": "Game Tester &amp; Indonesian Voice Specialist",
        "exp.lion.desc": "Tested &ldquo;Gems of War&rdquo;, documenting mechanics bugs and UI/UX issues, and was selected for a Meta-related project delivering precise Indonesian voice recordings.",
        "exp.earlier.role": "Earlier — retail operations",
        "exp.earlier.desc": "Operations and reporting at The Foodhall (2023–2024): built reports in advanced Excel and tracked sales, returns, and inventory in SAP. Junior Store Leader at Indomaret Group (2019–2022): led daily store operations and the team, and hit sales targets on several occasions.",

        "contact.title": "Let&rsquo;s talk.",
        "contact.lead": "Have a role, a system worth rebuilding, or a product to ship? Send a message — I read everything.",
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
        "hero.title": "Saya membangun sistem full-stack<br>yang menggantikan kerja manual.",
        "hero.lead": "Saya Gilang, full-stack developer di Kyou. Saya membangun platform internal, aplikasi Android, dan desktop client yang dipakai tim gudang dan e-commerce setiap hari — Go dan React di sisi server, Kotlin di lantai gudang. Sebagian besar yang saya rilis menggantikan sesuatu yang tadinya manual: satu spreadsheet, satu admin panel warisan, satu pekerjaan yang dulu dikerjakan orang dengan tangan.",
        "hero.cta_work": "Lihat karya",
        "hero.cta_contact": "Hubungi saya",

        "work.title": "Karya pilihan.",
        "work.intro": "Sistem yang berjalan di produksi, dan produk yang saya rancang serta rilis sendiri.",
        "work.gallery": "Lihat screenshot",
        "work.live_tag": "Live",
        "work.wip_tag": "Dikerjakan",
        "work.prod_tag": "Di produksi",

        "work.tier1": "Sistem produksi · Kyou",
        "work.tier1_note": "Sistem internal yang dipakai tim gudang, fulfillment, dan e-commerce setiap hari. Disebut berdasarkan fungsinya — nama internal dan kode sumbernya tetap privat. Angka kontribusi diambil dari git.",
        "work.tier2": "Produk &amp; kerja klien",

        "work.platform.name": "Platform Operasional Tim",
        "work.platform.desc": "Perusahaan ini dulu berjalan di atas admin panel warisan dan tumpukan spreadsheet. Saya memindahkannya ke satu platform, sepotong demi sepotong — manajemen stok, perubahan harga, rotasi stok yang tadinya tersebar di tiga sheet terpisah, tarif kurir, konfirmasi pembayaran. Di sini saya menggarap seluruh lapisan: service Go, front end React, dan migrasi Postgres di bawahnya. Saya juga membangun lapisan pelaporan GOLD untuk dashboard penjualan, generator invoice B2B yang mengubah order ID jadi PDF siap cetak, dan modul laporan harian yang dipakai tim engineering.",
        "work.platform.metric": "1.012 commit · kontributor teratas dari sembilan orang",

        "work.pda.name": "Aplikasi PDA Gudang",
        "work.pda.desc": "Aplikasi Android native yang dipakai lantai gudang sepanjang hari: opname, picking, packing, dan barang datang. Saya membangun scan barcode lewat kamera, alur opname rak-first dengan foto bukti, dan absen kedatangan yang bisa digarap beberapa staf sekaligus dalam satu batch — lock per item dan polling 7 detik menjaga mereka tidak bertabrakan. Layar cek stok event tetap jalan tanpa sinyal sama sekali, karena di gudang ada sudut-sudut yang memang tidak dapat apa-apa. Pencarian item sengaja tidak menampilkan harga modal: staf lantai dapat semua yang mereka butuhkan, tanpa yang tidak seharusnya mereka lihat.",
        "work.pda.metric": "267 dari 425 commit · 51 ribu baris Kotlin",

        "work.label.name": "Client Label Kedatangan",
        "work.label.desc": "Saat barang datang, sebagian unit milik rak toko dan sebagian lagi milik pesanan yang sudah dibayar customer. Keduanya tiba di kardus yang sama, dan kalau tertukar, ada orang kehilangan pesanannya. Client Windows ini membaca log kedatangan lalu mencetak label thermal 33&times;19mm yang memisahkan keduanya — unit yang sudah laku membawa penanda dan referensi pembelinya sendiri, jadi tim alokasi tidak mungkin tertukar. Read-only secara desain: tidak pernah menulis ke stok, order, maupun alokasi. Absen yang sama yang saya bangun untuk HP, dipindahkan ke PC dengan scanner USB, karena kerja borongan jauh lebih cepat lewat keyboard.",
        "work.label.metric": "25 rilis bertag · memperbarui diri sendiri di lapangan",

        "work.ops.name": "Service Automasi Operasional",
        "work.ops.desc": "Lapisan penghubung antara sistem yang sudah dipakai tim — admin panel, PDA gudang, spreadsheet, Metabase, Notion — dan Discord, tempat pekerjaan sebenarnya dikoordinasikan. Ia menyadari order yang tersangkut di picking lalu bertanya langsung ke orang yang bisa melepasnya, di channel. Ia menerima foto bukti dan batch barang langsung dari PDA. Sebuah browser extension mengawasi booking driver dan mencoba ulang saat tidak ada yang dapat. Scheduler mengurus hal-hal rutin yang tidak seharusnya perlu diingat orang.",
        "work.ops.metric": "~16.600 baris · Node.js &amp; TypeScript",

        "work.stzn.desc": "Storefront streetwear berbasis drop yang saya rancang dan bangun dengan Next.js — sudah tayang dan lengkap, termasuk checkout lewat payment gateway Midtrans dengan dukungan QRIS.",
        "work.stzn.live": "Buka situs live",
        "work.kasirin.desc": "POS offline-first untuk minimarket ber-trafik tinggi (50rb+ SKU). Transaksi tetap berjalan walau koneksi putus, stok ter-update secara real-time lewat SSE, dan transaksi atomik mencegah overselling. Sebuah model Brain.js menandai kebutuhan restock sebelum stok habis.",
        "work.itungin.desc": "Aplikasi keuangan pribadi yang mobile-first, dibangun dengan React dan dirilis ke Android lewat Capacitor. Melacak arus kas dengan grafik real-time, menilai kesehatan utang lewat indikator debt-to-income, menjaga anggaran tiap kategori dengan peringatan langsung, dan mengingatkan tagihan rutin.",

        "work.agency.name": "Company Profile Agensi",
        "work.agency.desc": "Situs company profile untuk agensi digital: sebelas halaman berisi layanan, studi kasus, tim, dan kontak, dengan animasi scroll serta jalur tanya lewat WhatsApp buat calon klien yang malas mengisi form. Dirancang dengan aturan tiga klik — pertanyaan apa pun yang mungkin muncul di kepala calon klien paling jauh tiga klik dari halaman depan. Beginilah bentuk situs marketing yang saya bangun untuk klien, dan sudah siap di-rebranding untuk salah satunya.",

        "about.title": "Tentang.",
        "about.p1": "Saya membangun software yang diandalkan orang lain untuk melewati hari kerjanya. Di Kyou itu berarti empat basis kode dan empat bahasa: platform Go dan React, aplikasi Android Kotlin untuk lantai gudang, desktop client Electron, dan service Node yang menyatukan semuanya. Polanya hampir selalu sama — cari pekerjaan yang masih dikerjakan dengan tangan, lalu ganti dengan sesuatu yang tahan dipakai di beban kerja sungguhan.",
        "about.p2": "Sebelum semua itu, saya bertahun-tahun memimpin operasional retail: operasional toko dan departemen, target penjualan, akurasi stok dan harga. Itu bukan jalan memutar menuju ke sini — justru itu alasan software-nya bekerja. Saya sudah lebih dulu tahu di mana sebuah bisnis kehilangan waktu, angka mana yang diam-diam tidak dipercaya orang, dan kenapa layar yang secara teknis benar bisa tetap tidak berguna pada jam 7 pagi saat antrean mulai mengular.",
        "about.p3": "Saya mahasiswa Sistem Informasi yang belajar lewat karya yang benar-benar dirilis, dan semua sistem itu berjalan di produksi. Jika Anda butuh orang yang paham lantai gudang sekaligus basis kodenya, mari mengobrol.",
        "about.skills_title": "Yang saya gunakan",
        "about.skill_ai": "AI engineering &amp; automation",
        "about.skill_qa": "QA &amp; testing",
        "about.edu_title": "Pendidikan &amp; sertifikat",
        "about.edu_degree": "S.Tr Sistem Informasi Manajemen · 2023–2027",

        "act.title": "Kode &amp; aktivitas.",
        "act.intro": "Cuplikan langsung aktivitas GitHub saya selama 6 bulan terakhir. Sebagian besar pekerjaan kantor saya ada di GitLab privat, jadi ini baru sebagian dari gambarannya.",
        "act.cal": "Kontribusi GitHub",
        "act.less": "Sedikit",
        "act.more": "Banyak",
        "act.private_title": "Yang tidak terlihat di grafik ini",
        "act.private_body": "Sebagian besar yang saya bangun ada di repositori privat perusahaan: aplikasi Android yang dipakai lantai gudang, platform Go dan React, desktop client Windows, dan service yang menyatukan semuanya. Empat basis kode, empat bahasa, semuanya di produksi — dan tidak satu pun membuat kalender ini menghijau.",

        "exp.title": "Pengalaman.",
        "exp.present": "Sekarang",
        "exp.kyou.role": "Full Stack Developer",
        "exp.kyou.desc": "Membangun dan merawat platform internal tempat perusahaan berjalan — service Go, front end React, dan skema Postgres di bawahnya — ditambah aplikasi Android untuk lantai gudang dan client Windows untuk barang datang. Kontributor teratas di platform dengan 1.012 commit, dan 63% dari aplikasi Android. Sebagian besar pekerjaannya adalah migrasi: mengeluarkan proses dari spreadsheet dan admin panel warisan, lalu membangunnya ulang jadi sistem yang bisa dipercaya orang.",
        "exp.indie.role": "Freelance Full-Stack Developer",
        "exp.indie.desc": "Praktik mandiri saya — merancang dan merilis web app, aplikasi mobile, dan automasi untuk klien, serta menangani proyek baru dari awal sampai jadi. Produk inisiatif sendiri sejauh ini termasuk Kasirin dan Itungin, dibangun dengan Next.js, React, dan TypeScript. Terbuka untuk proyek baru.",
        "exp.informa.role": "Assistant Product Specialist",
        "exp.informa.desc": "Mengelola operasional tingkat departemen — akurasi harga, keselarasan kampanye, alur stok, dan visual merchandising — sekaligus mencapai 100% target penjualan dalam tiga bulan pertama lewat penguasaan produk dan pelayanan yang baik.",
        "exp.lion.role": "Game Tester &amp; Spesialis Voice Indonesia",
        "exp.lion.desc": "Menguji &ldquo;Gems of War&rdquo;, mendokumentasikan bug mekanik dan masalah UI/UX, lalu terpilih untuk proyek terkait Meta yang menghasilkan rekaman suara bahasa Indonesia yang presisi.",
        "exp.earlier.role": "Sebelumnya — operasional retail",
        "exp.earlier.desc": "Operasional &amp; pelaporan di The Foodhall (2023–2024): menyusun laporan dengan Excel tingkat lanjut serta melacak penjualan, retur, dan stok di SAP. Junior Store Leader di Indomaret Group (2019–2022): memimpin operasional harian toko dan tim, serta beberapa kali mencapai target penjualan.",

        "contact.title": "Mari bicara.",
        "contact.lead": "Punya posisi, sistem yang layak dibangun ulang, atau produk yang ingin dirilis? Kirim pesan — semuanya saya baca.",
        "contact.name": "Nama",
        "contact.email": "Email",
        "contact.message": "Ceritakan sedikit tentang proyeknya…",
        "contact.send": "Kirim pesan",

        "footer.top": "Kembali ke atas ↑"
    }
};

// ---------------------------------------------------------
// EN / ID copy. English is the HTML default; these keys keep
// both languages in sync. Tone & rules: see skills.md.
// ---------------------------------------------------------

const translations = {
    en: {
        "nav.work": "Work",
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.contact": "Contact",

        "hero.status": "Automation Engineer @ Kyou · open to remote · Indonesia",
        "hero.title": "I automate business operations,<br>and build the apps that run them.",
        "hero.lead": "I&rsquo;m Gilang, an Operations Automation Engineer at Kyou. I take messy warehouse, logistics, and e-commerce workflows and rebuild them as automated systems — and outside work I design and ship my own products, like <a href=\"https://stzn-green.vercel.app/\" target=\"_blank\" rel=\"noopener\">STZN</a>.",
        "hero.cta_work": "See my work",
        "hero.cta_contact": "Get in touch",

        "work.title": "Things I&rsquo;ve built.",
        "work.live_tag": "Live",
        "work.wip_tag": "In progress",
        "work.code": "View code",
        "work.stzn.desc": "Designed and shipped a drop-based streetwear storefront on Next.js. Sells in limited seasonal drops rather than open stock, with subscriber early access and a bilingual interface tuned for a slow, premium feel.",
        "work.stzn.live": "Visit live site",
        "work.kasirin.desc": "An offline-first POS engineered for high-traffic minimarkets (50k+ SKUs). Checkout keeps running when the connection drops, inventory streams in real time over SSE, and atomic transactions block overselling. A Brain.js model flags restocks before stock runs out.",
        "work.itungin.desc": "A mobile-first personal finance app, built React-first and shipped to Android with Capacitor. Tracks cash flow with live charts, scores debt health with a debt-to-income indicator, enforces category budgets with real-time warnings, and reminds you of recurring bills.",

        "about.title": "About.",
        "about.p1": "For years I ran retail floors — leading store and department operations, hitting sales targets, and keeping inventory and pricing accurate. That work showed me exactly where a business loses time, and where the right software pays for itself.",
        "about.p2": "Now I build that software. At Kyou I map warehouse, logistics, and e-commerce workflows and rebuild them as automated systems, pairing AI engineering with solid fundamentals to cut manual work and human error. I ship full-stack products end to end — from the data model to the interface.",
        "about.p3": "I&rsquo;m an Information Systems student who learns by shipping. The work is real and running in production; the goal is to keep raising the bar. If you need someone who reads both the shop floor and the codebase, let&rsquo;s talk.",
        "about.skills_title": "What I work with",
        "about.skill_auto": "Process automation",
        "about.skill_ai": "AI engineering &amp; automation",
        "about.skill_bpi": "Business process improvement",
        "about.skill_qa": "QA &amp; testing",
        "about.skill_copy": "Copywriting (EN / ID)",
        "about.edu_title": "Education &amp; credentials",
        "about.edu_degree": "B.Tech, Management Information Systems · 2023–2027",

        "exp.title": "Experience.",
        "exp.present": "Present",
        "exp.kyou.role": "Operations Automation Engineer",
        "exp.kyou.desc": "Map and automate warehouse, logistics, and e-commerce workflows, integrating AI tooling and modern frameworks to remove manual bottlenecks. Shipped Machitan, an internal Android app that runs on the warehouse team&rsquo;s rugged PDA handhelds.",
        "exp.indie.role": "Freelance Developer &amp; Builder",
        "exp.indie.desc": "My own practice — I design and ship web apps, mobile apps, and automation for clients, and I take on new builds end to end. Self-initiated products so far include Kasirin and Itungin, built with Next.js, React, and TypeScript. Available for new work.",
        "exp.informa.role": "Sales Executive &amp; Assistant Product Specialist",
        "exp.informa.desc": "Hit 100% of sales targets within the first three months and was promoted to oversee department-level operations — pricing accuracy, campaign alignment, inventory workflows, and visual merchandising.",
        "exp.lion.role": "Game Tester &amp; Indonesian Voice Specialist",
        "exp.lion.desc": "Tested &ldquo;Gems of War&rdquo;, documenting mechanics bugs and UI/UX issues, and was selected for a Meta-related project delivering precise Indonesian voice recordings.",
        "exp.foodhall.role": "Staff — Operations &amp; Reporting",
        "exp.foodhall.desc": "Built operational reports with advanced Excel (pivot tables, complex formulas) and tracked sales, returns, and inventory in SAP to support store decisions.",
        "exp.indomaret.role": "Junior Store Leader → Store Clerk",
        "exp.indomaret.desc": "Ran daily store operations, supervised staff, handled high-volume POS transactions, and consistently beat promotional targets over 3+ years.",

        "contact.title": "Let&rsquo;s talk.",
        "contact.lead": "Have a role, a workflow worth automating, or a product to build? Send a message — I read everything.",
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

        "hero.status": "Automation Engineer @ Kyou · terbuka untuk remote · Indonesia",
        "hero.title": "Saya mengotomasi operasi bisnis,<br>dan membangun app yang menjalankannya.",
        "hero.lead": "Saya Gilang, Operations Automation Engineer di Kyou. Saya mengubah alur kerja <i>warehouse</i>, logistik, dan <i>e-commerce</i> yang berantakan menjadi sistem otomatis — dan di luar pekerjaan, saya merancang serta merilis produk sendiri, seperti <a href=\"https://stzn-green.vercel.app/\" target=\"_blank\" rel=\"noopener\">STZN</a>.",
        "hero.cta_work": "Lihat karya",
        "hero.cta_contact": "Hubungi saya",

        "work.title": "Yang sudah saya bangun.",
        "work.live_tag": "Live",
        "work.wip_tag": "Dikerjakan",
        "work.code": "Lihat kode",
        "work.stzn.desc": "Merancang dan merilis <i>storefront</i> streetwear berbasis <i>drop</i> dengan Next.js. Menjual lewat <i>drop</i> musiman terbatas alih-alih stok terbuka, dengan akses awal untuk <i>subscriber</i> dan antarmuka bilingual yang dibuat terasa pelan dan premium.",
        "work.stzn.live": "Buka situs live",
        "work.kasirin.desc": "POS <i>offline-first</i> yang dirancang untuk minimarket ber-trafik tinggi (50rb+ SKU). Transaksi tetap berjalan saat koneksi putus, stok mengalir <i>real-time</i> lewat SSE, dan transaksi atomik mencegah <i>overselling</i>. Model Brain.js menandai kebutuhan <i>restock</i> sebelum stok habis.",
        "work.itungin.desc": "Aplikasi keuangan pribadi <i>mobile-first</i>, dibangun dengan React dan dirilis ke Android via Capacitor. Melacak arus kas dengan grafik langsung, menilai kesehatan utang lewat indikator <i>debt-to-income</i>, menjaga anggaran per kategori dengan peringatan <i>real-time</i>, dan mengingatkan tagihan rutin.",

        "about.title": "Tentang.",
        "about.p1": "Bertahun-tahun saya mengelola lantai retail — memimpin operasional toko dan departemen, mengejar target penjualan, dan menjaga akurasi stok serta harga. Dari sana saya tahu persis di mana sebuah bisnis kehilangan waktu, dan di mana software yang tepat benar-benar sepadan.",
        "about.p2": "Sekarang saya membangun software itu. Di Kyou saya memetakan alur kerja <i>warehouse</i>, logistik, dan <i>e-commerce</i> lalu membangunnya ulang sebagai sistem otomatis, memadukan <i>AI engineering</i> dengan fondasi teknis yang kuat untuk memangkas kerja manual dan <i>human error</i>. Saya merilis produk <i>full-stack</i> secara utuh — dari <i>data model</i> hingga antarmuka.",
        "about.p3": "Saya mahasiswa Sistem Informasi yang belajar lewat merilis karya. Pekerjaannya nyata dan berjalan di produksi; targetnya terus menaikkan standar. Kalau Anda butuh orang yang paham lantai toko sekaligus <i>codebase</i>-nya, mari bicara.",
        "about.skills_title": "Yang saya gunakan",
        "about.skill_auto": "Automasi proses",
        "about.skill_ai": "AI engineering &amp; automation",
        "about.skill_bpi": "Perbaikan proses bisnis",
        "about.skill_qa": "QA &amp; testing",
        "about.skill_copy": "Copywriting (EN / ID)",
        "about.edu_title": "Pendidikan &amp; sertifikat",
        "about.edu_degree": "S.Tr, Sistem Informasi Manajemen · 2023–2027",

        "exp.title": "Pengalaman.",
        "exp.present": "Sekarang",
        "exp.kyou.role": "Operations Automation Engineer",
        "exp.kyou.desc": "Memetakan dan mengotomasi alur kerja <i>warehouse</i>, logistik, dan <i>e-commerce</i>, mengintegrasikan <i>AI tooling</i> dan framework modern untuk menghapus <i>bottleneck</i> manual. Merilis Machitan, aplikasi Android internal yang berjalan di perangkat PDA <i>rugged</i> tim gudang.",
        "exp.indie.role": "Freelance Developer &amp; Builder",
        "exp.indie.desc": "Praktik mandiri saya — merancang dan merilis <i>web apps</i>, aplikasi mobile, dan automasi untuk klien, serta menangani proyek baru dari awal hingga selesai. Produk inisiatif sendiri sejauh ini mencakup Kasirin dan Itungin, dibangun dengan Next.js, React, dan TypeScript. Terbuka untuk proyek baru.",
        "exp.informa.role": "Sales Executive &amp; Assistant Product Specialist",
        "exp.informa.desc": "Mencapai 100% target penjualan dalam tiga bulan pertama dan dipromosikan mengawasi operasional tingkat departemen — akurasi harga, keselarasan kampanye, alur stok, dan visual merchandising.",
        "exp.lion.role": "Game Tester &amp; Spesialis Voice Indonesia",
        "exp.lion.desc": "Menguji &ldquo;Gems of War&rdquo;, mendokumentasikan bug mekanik dan masalah UI/UX, serta terpilih untuk proyek terkait Meta yang menghasilkan rekaman suara bahasa Indonesia yang presisi.",
        "exp.foodhall.role": "Staf — Operasional &amp; Pelaporan",
        "exp.foodhall.desc": "Membuat laporan operasional dengan Excel tingkat lanjut (pivot table, formula kompleks) dan melacak penjualan, retur, serta stok di SAP untuk mendukung keputusan toko.",
        "exp.indomaret.role": "Junior Store Leader → Store Clerk",
        "exp.indomaret.desc": "Menjalankan operasional harian toko, mengawasi staf, menangani transaksi POS bervolume tinggi, dan konsisten melampaui target promosi selama 3+ tahun.",

        "contact.title": "Mari bicara.",
        "contact.lead": "Punya posisi, alur kerja yang layak diotomasi, atau produk yang ingin dibangun? Kirim pesan — saya baca semuanya.",
        "contact.name": "Nama",
        "contact.email": "Email",
        "contact.message": "Ceritakan sedikit tentang itu…",
        "contact.send": "Kirim pesan",

        "footer.top": "Kembali ke atas ↑"
    }
};

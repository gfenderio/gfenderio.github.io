// ---------------------------------------------------------
// EN / ID copy. English is the HTML default; these keys keep
// both languages in sync. Every value maps to a data-i18n key.
// ---------------------------------------------------------

const translations = {
    en: {
        "nav.work": "Work",
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.contact": "Contact",

        "hero.status": "Automation Engineer @ Kyou · open to remote · Indonesia",
        "hero.title": "I automate business operations,<br>and build the apps that run them.",
        "hero.lead": "I&rsquo;m Gilang — an Operations Automation Engineer at Kyou. I map messy warehouse, logistics, and e-commerce workflows and rebuild them with AI-assisted automation. On the side I ship my own products, including <a href=\"https://stzn-green.vercel.app/\" target=\"_blank\" rel=\"noopener\">STZN</a>.",
        "hero.cta_work": "See my work",
        "hero.cta_contact": "Get in touch",

        "work.title": "Things I&rsquo;ve built.",
        "work.live_tag": "Live",
        "work.wip_tag": "In progress",
        "work.stzn.desc": "A drop-based streetwear brand and storefront — designed and built from scratch on Next.js. Limited seasonal &ldquo;drops&rdquo; instead of endless stock, early access for subscribers, and a clean bilingual interface with a deliberately slow, premium feel.",
        "work.stzn.live": "Visit live site",
        "work.kasirin.desc": "A point-of-sale system to streamline retail transactions — built straight from my years running stores. Sales, inventory, and reporting in one place, designed to be learned in minutes.",
        "work.itungin.desc": "A financial tracking tool for accurate budgeting and expense management — focused on clear numbers and calculations you can actually trust.",
        "work.itungin.stack": "AI-assisted",

        "about.title": "About.",
        "about.p1": "I spent years leading store and department operations in retail — hitting sales targets, keeping inventory and pricing accurate, and training teams. That taught me exactly where a business loses time, and where software actually helps instead of getting in the way.",
        "about.p2": "Now at Kyou I do that for a living: mapping warehouse, logistics, and e-commerce workflows and rebuilding them with AI-assisted automation to cut manual bottlenecks and human error. I&rsquo;m a proud &ldquo;vibe coder&rdquo; — I lean on AI dev tools to prototype fast, structure backend logic, and ship working products.",
        "about.p3": "I&rsquo;m honest about where I am: an Information Systems student still early in the craft, but with real things shipped and an operator&rsquo;s sense of what matters. If that mix is useful to you — for a role, a project, or remote work — let&rsquo;s talk.",
        "about.skills_title": "What I work with",
        "about.skill_auto": "Process automation",
        "about.skill_ai": "AI-assisted development",
        "about.skill_bpi": "Business process improvement",
        "about.skill_qa": "QA &amp; testing",
        "about.skill_copy": "Copywriting (EN / ID)",
        "about.edu_title": "Education &amp; credentials",
        "about.edu_degree": "B.Tech, Management Information Systems · 2023–2027",

        "exp.title": "Experience.",
        "exp.present": "Present",
        "exp.kyou.role": "Operations Automation Engineer",
        "exp.kyou.desc": "Map and automate warehouse, logistics, and e-commerce workflows. Integrate AI tools and modern frameworks to remove manual bottlenecks, and streamline internal platforms for better team productivity and data accuracy.",
        "exp.indie.role": "Independent Developer",
        "exp.indie.desc": "Conceptualized and built my own applications — Kasirin (POS) and Itungin (finance tracker) — using AI-assisted development to prototype, structure backend logic (PHP, JavaScript, SQL), and test for stability and accuracy.",
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
        "hero.lead": "Saya Gilang — Operations Automation Engineer di Kyou. Saya memetakan alur kerja warehouse, logistik, dan e-commerce yang berantakan lalu membangunnya ulang dengan automasi berbantuan AI. Di sela itu saya merilis produk sendiri, termasuk <a href=\"https://stzn-green.vercel.app/\" target=\"_blank\" rel=\"noopener\">STZN</a>.",
        "hero.cta_work": "Lihat karya",
        "hero.cta_contact": "Hubungi saya",

        "work.title": "Yang sudah saya bangun.",
        "work.live_tag": "Live",
        "work.wip_tag": "Dikerjakan",
        "work.stzn.desc": "Brand dan toko streetwear berbasis drop — saya desain dan bangun dari nol dengan Next.js. Rilis terbatas per musim, bukan stok tanpa henti, akses awal untuk subscriber, dan antarmuka bilingual yang bersih dengan kesan premium yang sengaja dibuat &ldquo;pelan&rdquo;.",
        "work.stzn.live": "Buka situs live",
        "work.kasirin.desc": "Aplikasi point-of-sale untuk merapikan transaksi retail — lahir langsung dari pengalaman saya bertahun-tahun mengelola toko. Penjualan, stok, dan laporan dalam satu tempat, dirancang agar bisa dikuasai dalam hitungan menit.",
        "work.itungin.desc": "Alat pelacak keuangan untuk anggaran dan pengeluaran yang akurat — fokus pada angka yang jelas dan perhitungan yang benar-benar bisa dipercaya.",
        "work.itungin.stack": "AI-assisted",

        "about.title": "Tentang.",
        "about.p1": "Saya bertahun-tahun memimpin operasional toko dan departemen di retail — mengejar target penjualan, menjaga akurasi stok dan harga, serta melatih tim. Dari situ saya tahu persis di mana bisnis kehilangan waktu, dan di mana software benar-benar membantu, bukan menghambat.",
        "about.p2": "Sekarang di Kyou itu jadi pekerjaan saya: memetakan alur kerja warehouse, logistik, dan e-commerce lalu membangunnya ulang dengan automasi berbantuan AI untuk memangkas bottleneck manual dan human error. Saya &ldquo;vibe coder&rdquo; tulen — saya manfaatkan AI dev tools untuk prototyping cepat, menyusun logika backend, dan merilis produk yang berfungsi.",
        "about.p3": "Saya jujur soal posisi saya: mahasiswa Sistem Informasi yang masih awal di bidang ini, tapi sudah punya karya nyata dan cara pandang seorang operator soal apa yang penting. Kalau kombinasi itu berguna untuk Anda — untuk posisi, proyek, atau kerja remote — mari bicara.",
        "about.skills_title": "Yang saya gunakan",
        "about.skill_auto": "Automasi proses",
        "about.skill_ai": "Pengembangan berbantuan AI",
        "about.skill_bpi": "Perbaikan proses bisnis",
        "about.skill_qa": "QA &amp; testing",
        "about.skill_copy": "Copywriting (EN / ID)",
        "about.edu_title": "Pendidikan &amp; sertifikat",
        "about.edu_degree": "S.Tr, Sistem Informasi Manajemen · 2023–2027",

        "exp.title": "Pengalaman.",
        "exp.present": "Sekarang",
        "exp.kyou.role": "Operations Automation Engineer",
        "exp.kyou.desc": "Memetakan dan mengotomasi alur kerja warehouse, logistik, dan e-commerce. Mengintegrasikan AI tools dan framework modern untuk menghapus bottleneck manual, serta merapikan platform internal demi produktivitas tim dan akurasi data.",
        "exp.indie.role": "Independent Developer",
        "exp.indie.desc": "Merancang dan membangun aplikasi sendiri — Kasirin (POS) dan Itungin (pelacak keuangan) — memakai pengembangan berbantuan AI untuk prototyping, menyusun logika backend (PHP, JavaScript, SQL), dan menguji stabilitas serta akurasi.",
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

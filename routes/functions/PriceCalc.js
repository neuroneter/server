
//Listado de constantes
const States = [
    {code:"11", name:"BOGOTA", default:"11001", cities:[
        {code:"11001", name:"BOGOTA D.C.", rate:"L"},
    ]},
    {code:"91", name:"AMAZONAS", default:"91001", cities:[
        {code:"91263", name:"EL ENCANTO", rate:"N"},
        {code:"91405", name:"LA CHORRERA", rate:"N"},
        {code:"91407", name:"LA PEDRERA", rate:"N"},
        {code:"91430", name:"LA VICTORIA", rate:"N"},
        {code:"91001", name:"LETICIA", rate:"N"},
        {code:"91460", name:"MIRITI - PARANÁ", rate:"N"},
        {code:"91530", name:"PUERTO ALEGRIA", rate:"N"},
        {code:"91536", name:"PUERTO ARICA", rate:"N"},
        {code:"91540", name:"PUERTO NARIÑO", rate:"N"},
        {code:"91669", name:"PUERTO SANTANDER", rate:"N"},
        {code:"91798", name:"TARAPACÁ", rate:"N"}
    ]},
    {code:"05", name:"ANTIOQUIA", default:"05670", cities:[
        {code:"05120", name:"CÁCERES", rate:"N"},
        {code:"05154", name:"CAUCASIA", rate:"N"},
        {code:"05250", name:"EL BAGRE", rate:"N"},
        {code:"05495", name:"NECHÍ", rate:"N"},
        {code:"05790", name:"TARAZÁ", rate:"N"},
        {code:"05895", name:"ZARAGOZA", rate:"N"},
        {code:"05142", name:"CARACOLÍ", rate:"N"},
        {code:"05425", name:"MACEO", rate:"N"},
        {code:"05579", name:"PUERTO BERRiO", rate:"N"},
        {code:"05585", name:"PUERTO NARE", rate:"N"},
        {code:"05591", name:"PUERTO TRIUNFO", rate:"N"},
        {code:"05893", name:"YONDÓ", rate:"N"},
        {code:"05031", name:"AMALFI", rate:"N"},
        {code:"05040", name:"ANORÍ", rate:"N"},
        {code:"05190", name:"CISNEROS", rate:"N"},
        {code:"05604", name:"REMEDIOS", rate:"N"},
        {code:"05670", name:"SAN ROQUE", rate:"N"},
        {code:"05690", name:"SANTO DOMINGO", rate:"N"},
        {code:"05736", name:"SEGOVIA", rate:"N"},
        {code:"05858", name:"VEGACHÍ", rate:"N"},
        {code:"05885", name:"YALÍ", rate:"N"},
        {code:"05890", name:"YOLOMBÓ", rate:"N"},
        {code:"05038", name:"ANGOSTURA", rate:"N"},
        {code:"05086", name:"BELMIRA", rate:"N"},
        {code:"05107", name:"BRICEÑO", rate:"N"},
        {code:"05134", name:"CAMPAMENTO", rate:"N"},
        {code:"05150", name:"CAROLINA", rate:"N"},
        {code:"05237", name:"DON MATIAS", rate:"N"},
        {code:"05264", name:"ENTRERRIOS", rate:"N"},
        {code:"05310", name:"GÓMEZ PLATA", rate:"N"},
        {code:"05315", name:"GUADALUPE", rate:"N"},
        {code:"05361", name:"ITUANGO", rate:"N"},
        {code:"05647", name:"SAN ANDRÉS", rate:"N"},
        {code:"05658", name:"SAN JOSÉ DE LA MONTAS", rate:"N"},
        {code:"05664", name:"SAN PEDRO", rate:"N"},
        {code:"05686", name:"SANTA ROSA DE OSOS", rate:"N"},
        {code:"05819", name:"TOLEDO", rate:"N"},
        {code:"05854", name:"VALDIVIA", rate:"N"},
        {code:"05887", name:"YARUMAL", rate:"N"},
        {code:"05004", name:"ABRIAQUÍ", rate:"N"},
        {code:"05044", name:"ANZA", rate:"N"},
        {code:"05059", name:"ARMENIA", rate:"N"},
        {code:"05113", name:"BURITICÁ", rate:"N"},
        {code:"05138", name:"CAÑASGORDAS", rate:"N"},
        {code:"05234", name:"DABEIBA", rate:"N"},
        {code:"05240", name:"EBÉJICO", rate:"N"},
        {code:"05284", name:"FRONTINO", rate:"N"},
        {code:"05306", name:"GIRALDO", rate:"N"},
        {code:"05347", name:"HELICONIA", rate:"N"},
        {code:"05411", name:"LIBORINA", rate:"N"},
        {code:"05501", name:"OLAYA", rate:"N"},
        {code:"05543", name:"PEQUE", rate:"N"},
        {code:"05628", name:"SABANALARGA", rate:"N"},
        {code:"05656", name:"SAN JERÓNIMO", rate:"N"},
        {code:"05042", name:"SANTAFÉ DE ANTIOQUIAS", rate:"N"},
        {code:"05761", name:"SOPETRAN", rate:"N"},
        {code:"05842", name:"URAMITA", rate:"N"},
        {code:"05002", name:"ABEJORRAL", rate:"N"},
        {code:"05021", name:"ALEJANDRÍA", rate:"N"},
        {code:"05055", name:"ARGELIA", rate:"N"},
        {code:"05148", name:"CARMEN DE VIBORAL", rate:"N"},
        {code:"05197", name:"COCORNÁ", rate:"N"},
        {code:"05206", name:"CONCEPCIÓN", rate:"N"},
        {code:"05313", name:"GRANADA", rate:"N"},
        {code:"05318", name:"GUARNE", rate:"N"},
        {code:"05321", name:"GUATAPE", rate:"N"},
        {code:"05376", name:"LA CEJA", rate:"N"},
        {code:"05400", name:"LA UNIÓN", rate:"N"},
        {code:"05440", name:"MARINILLA", rate:"N"},
        {code:"05483", name:"NARIÑO", rate:"N"},
        {code:"05541", name:"PEÑOL", rate:"N"},
        {code:"05607", name:"RETIRO", rate:"N"},
        {code:"05615", name:"RIONEGRO", rate:"N"},
        {code:"05649", name:"SAN CARLOS", rate:"N"},
        {code:"05652", name:"SAN FRANCISCO", rate:"N"},
        {code:"05660", name:"SAN LUIS", rate:"N"},
        {code:"05667", name:"SAN RAFAEL", rate:"N"},
        {code:"05674", name:"SAN VICENTE", rate:"N"},
        {code:"05697", name:"SANTUARIO", rate:"N"},
        {code:"05756", name:"SONSON", rate:"N"},
        {code:"05030", name:"AMAGA", rate:"N"},
        {code:"05034", name:"ANDES", rate:"N"},
        {code:"05036", name:"ANGELOPOLIS", rate:"N"},
        {code:"05091", name:"BETANIA", rate:"N"},
        {code:"05093", name:"BETULIA", rate:"N"},
        {code:"05125", name:"CAICEDO", rate:"N"},
        {code:"05145", name:"CARAMANTA", rate:"N"},
        {code:"05101", name:"CIUDAD BOLÍVAR", rate:"N"},
        {code:"05209", name:"CONCORDIA", rate:"N"},
        {code:"05282", name:"FREDONIA", rate:"N"},
        {code:"05353", name:"HISPANIA", rate:"N"},
        {code:"05364", name:"JARDÍN", rate:"N"},
        {code:"05368", name:"JERICÓ", rate:"N"},
        {code:"05390", name:"LA PINTADA", rate:"N"},
        {code:"05467", name:"MONTEBELLO", rate:"N"},
        {code:"05576", name:"PUEBLORRICO", rate:"N"},
        {code:"05642", name:"SALGAR", rate:"N"},
        {code:"05679", name:"SANTA BARBARA", rate:"N"},
        {code:"05789", name:"TÁMESIS", rate:"N"},
        {code:"05792", name:"TARSO", rate:"N"},
        {code:"05809", name:"TITIRIBÍ", rate:"N"},
        {code:"05847", name:"URRAO", rate:"N"},
        {code:"05856", name:"VALPARAISO", rate:"N"},
        {code:"05861", name:"VENECIA", rate:"N"},
        {code:"05045", name:"APARTADÓ", rate:"N"},
        {code:"05051", name:"ARBOLETES", rate:"N"},
        {code:"05147", name:"CAREPA", rate:"N"},
        {code:"05172", name:"CHIGORODÓ", rate:"N"},
        {code:"05475", name:"MURINDÓ", rate:"N"},
        {code:"05480", name:"MUTATA", rate:"N"},
        {code:"05490", name:"NECOCLÍ", rate:"N"},
        {code:"05659", name:"SAN JUAN DE URABA", rate:"N"},
        {code:"05665", name:"SAN PEDRO DE URABA", rate:"N"},
        {code:"05837", name:"TURBO", rate:"N"},
        {code:"05873", name:"VIGÍA DEL FUERTE", rate:"N"},
        {code:"05079", name:"BARBOSA", rate:"N"},
        {code:"05088", name:"BELLO", rate:"N"},
        {code:"05129", name:"CALDAS", rate:"N"},
        {code:"05212", name:"COPACABANA", rate:"N"},
        {code:"05266", name:"ENVIGADO", rate:"N"},
        {code:"05308", name:"GIRARDOTA", rate:"N"},
        {code:"05360", name:"ITAGUI", rate:"N"},
        {code:"05380", name:"LA ESTRELLA", rate:"N"},
        {code:"05001", name:"MEDELLÍN", rate:"N"},
        {code:"05631", name:"SABANETA", rate:"N"},
    ]},
    {code:"81", name:"ARAUCA", default:"81001", cities:[
        {code:"81001", name:"ARAUCA", rate:"N"},
        {code:"81065", name:"ARAUQUITA", rate:"N"},
        {code:"81220", name:"CRAVO NORTE", rate:"N"},
        {code:"81300", name:"FORTUL", rate:"N"},
        {code:"81591", name:"PUERTO RONDÓN", rate:"N"},
        {code:"81736", name:"SARAVENA", rate:"N"},
        {code:"81794", name:"TAME", rate:"N"},
    ]},
    {code:"88", name:"ARCHIPIELAGO DE SANANDRES", default:"88564", cities:[
        {code:"88564", name:"PROVIDENCIA Y SANTA CATALINA", rate:"E"},
        {code:"88001", name:"SAN ANDRES", rate:"E"},
    ]},
    {code:"08", name:"ATLÁNTICO", default:"08001", cities:[
        {code:"08001", name:"BARRANQUILLA", rate:"N"},
        {code:"08296", name:"GALAPA", rate:"N"},
        {code:"08433", name:"MALAMBO", rate:"N"},
        {code:"08573", name:"PUERTO COLOMBIA", rate:"N"},
        {code:"08758", name:"SOLEDAD", rate:"N"},
        {code:"08137", name:"CAMPO DE LA CRUZ", rate:"N"},
        {code:"08141", name:"CANDELARIA", rate:"N"},
        {code:"08421", name:"LURUACO", rate:"N"},
        {code:"08436", name:"MANATI", rate:"N"},
        {code:"08606", name:"REPELON", rate:"N"},
        {code:"08675", name:"SANTA LUCIA", rate:"N"},
        {code:"08770", name:"SUAN", rate:"N"},
        {code:"08078", name:"BARANOA", rate:"N"},
        {code:"08520", name:"PALMAR DE VARELA", rate:"N"},
        {code:"08558", name:"POLONUEVO", rate:"N"},
        {code:"08560", name:"PONEDERA", rate:"N"},
        {code:"08634", name:"SABANAGRANDE", rate:"N"},
        {code:"08638", name:"SABANALARGA", rate:"N"},
        {code:"08685", name:"SANTO TOMAS", rate:"N"},
        {code:"08372", name:"JUAN DE ACOSTA", rate:"N"},
        {code:"08549", name:"PIOJÓ", rate:"N"},
        {code:"08832", name:"TUBARA", rate:"N"},
        {code:"08849", name:"USIACURI", rate:"N"},
    ]},
    {code:"13", name:"BOLIVAR", default:"13188", cities:[
        {code:"13188", name:"CICUCO", rate:"N"},
        {code:"13300", name:"HATILLO DE LOBA", rate:"N"},
        {code:"13440", name:"MARGARITA", rate:"N"},
        {code:"13468", name:"MOMPÓS", rate:"N"},
        {code:"13650", name:"SAN FERNANDO", rate:"N"},
        {code:"13780", name:"TALAIGUA NUEVO", rate:"N"},
        {code:"13052", name:"ARJONA", rate:"N"},
        {code:"13062", name:"ARROYOHONDO", rate:"N"},
        {code:"13140", name:"CALAMAR", rate:"N"},
        {code:"13001", name:"CARTAGENA", rate:"N"},
        {code:"13222", name:"CLEMENCIA", rate:"N"},
        {code:"13433", name:"MAHATES", rate:"N"},
        {code:"13620", name:"SAN CRISTOBAL", rate:"N"},
        {code:"13647", name:"SAN ESTANISLAO", rate:"N"},
        {code:"13673", name:"SANTA CATALINA", rate:"N"},
        {code:"13683", name:"SANTA ROSA DE LIMA", rate:"N"},
        {code:"13760", name:"SOPLAVIENTO", rate:"N"},
        {code:"13836", name:"TURBACO", rate:"N"},
        {code:"13838", name:"TURBANA", rate:"N"},
        {code:"13873", name:"VILLANUEVA", rate:"N"},
        {code:"13030", name:"ALTOS DEL ROSARIO", rate:"N"},
        {code:"13074", name:"BARRANCO DE LOBA", rate:"N"},
        {code:"13268", name:"EL PEÑON", rate:"N"},
        {code:"13580", name:"REGIDOR", rate:"N"},
        {code:"13600", name:"RÍO VIEJO", rate:"N"},
        {code:"13667", name:"SAN MARTIN DE LOBA", rate:"N"},
        {code:"13042", name:"ARENAL", rate:"N"},
        {code:"13160", name:"CANTAGALLO", rate:"N"},
        {code:"13473", name:"MORALES", rate:"N"},
        {code:"13670", name:"SAN PABLO", rate:"N"},
        {code:"13688", name:"SANTA ROSA DEL SUR", rate:"N"},
        {code:"13744", name:"SIMITÍ", rate:"N"},
        {code:"13006", name:"ACHÍ", rate:"N"},
        {code:"13430", name:"MAGANGUÉ", rate:"N"},
        {code:"13458", name:"MONTECRISTO", rate:"N"},
        {code:"13549", name:"PINILLOS", rate:"N"},
        {code:"13655", name:"SAN JACINTO DEL CAUCASIA", rate:"N"},
        {code:"13810", name:"TIQUISIO", rate:"N"},
        {code:"13244", name:"CARMEN DE BOLÍVAR", rate:"N"},
        {code:"13212", name:"CÓRDOBA", rate:"N"},
        {code:"13248", name:"EL GUAMO", rate:"N"},
        {code:"13442", name:"MARÍA LA BAJA", rate:"N"},
        {code:"13654", name:"SAN JACINTO", rate:"N"},
        {code:"13894", name:"ZAMBRANO", rate:"N"},
    ]},
    {code:"15", name:"BOYACÁ", default:"15232", cities:[
        {code:"15232", name:"CHÍQUIZA", rate:"N"},
        {code:"15187", name:"CHIVATÁ", rate:"N"},
        {code:"15204", name:"CÓMBITA", rate:"N"},
        {code:"15224", name:"CUCAITA", rate:"N"},
        {code:"15476", name:"MOTAVITA", rate:"N"},
        {code:"15500", name:"OICATÁ", rate:"N"},
        {code:"15646", name:"SAMACÁ", rate:"N"},
        {code:"15740", name:"SIACHOQUE", rate:"N"},
        {code:"15762", name:"SORA", rate:"N"},
        {code:"15764", name:"SORACÁ", rate:"N"},
        {code:"15763", name:"SOTAQUIRÁ", rate:"N"},
        {code:"15814", name:"TOCA", rate:"N"},
        {code:"15001", name:"TUNJA", rate:"N"},
        {code:"15837", name:"TUTA", rate:"N"},
        {code:"15861", name:"VENTAQUEMADA", rate:"N"},
        {code:"15180", name:"CHISCAS", rate:"N"},
        {code:"15223", name:"CUBARÁ", rate:"N"},
        {code:"15244", name:"EL COCUY", rate:"N"},
        {code:"15248", name:"EL ESPINO", rate:"N"},
        {code:"15317", name:"GUACAMAYAS", rate:"N"},
        {code:"15332", name:"GÜICÁN", rate:"N"},
        {code:"15522", name:"PANQUEBA", rate:"N"},
        {code:"15377", name:"LABRANZAGRANDE", rate:"N"},
        {code:"15518", name:"PAJARITO", rate:"N"},
        {code:"15533", name:"PAYA", rate:"N"},
        {code:"15550", name:"PISBA", rate:"N"},
        {code:"15090", name:"BERBEO", rate:"N"},
        {code:"15135", name:"CAMPOHERMOSO", rate:"N"},
        {code:"15455", name:"MIRAFLORES", rate:"N"},
        {code:"15514", name:"PÁEZ", rate:"N"},
        {code:"15660", name:"SAN EDUARDO", rate:"N"},
        {code:"15897", name:"ZETAQUIRA", rate:"N"},
        {code:"15104", name:"BOYACÁ", rate:"N"},
        {code:"15189", name:"CIÉNEGA", rate:"N"},
        {code:"15367", name:"JENESANO", rate:"N"},
        {code:"15494", name:"NUEVO COLÓN", rate:"N"},
        {code:"15599", name:"RAMIRIQUÍ", rate:"N"},
        {code:"15621", name:"RONDÓN", rate:"N"},
        {code:"15804", name:"TIBANÁ", rate:"N"},
        {code:"15835", name:"TURMEQUÉ", rate:"N"},
        {code:"15842", name:"UMBITA", rate:"N"},
        {code:"15879", name:"VIRACACHÁ", rate:"N"},
        {code:"15172", name:"CHINAVITA", rate:"N"},
        {code:"15299", name:"GARAGOA", rate:"N"},
        {code:"15425", name:"MACANAL", rate:"N"},
        {code:"15511", name:"PACHAVITA", rate:"N"},
        {code:"15667", name:"SAN LUIS DE GACENO", rate:"N"},
        {code:"15690", name:"SANTA MARÍA", rate:"N"},
        {code:"15097", name:"BOAVITA", rate:"N"},
        {code:"15218", name:"COVARACHÍA", rate:"N"},
        {code:"15403", name:"LA UVITA", rate:"N"},
        {code:"15673", name:"SAN MATEO", rate:"N"},
        {code:"15720", name:"SATIVANORTE", rate:"N"},
        {code:"15723", name:"SATIVASUR", rate:"N"},
        {code:"15753", name:"SOATÁ", rate:"N"},
        {code:"15774", name:"SUSACÓN", rate:"N"},
        {code:"15810", name:"TIPACOQUE", rate:"N"},
        {code:"15106", name:"BRICEÑO", rate:"N"},
        {code:"15109", name:"BUENAVISTA", rate:"N"},
        {code:"15131", name:"CALDAS", rate:"N"},
        {code:"15176", name:"CHIQUINQUIRÁ", rate:"N"},
        {code:"15212", name:"COPER", rate:"N"},
        {code:"15401", name:"LA VICTORIA", rate:"N"},
        {code:"15442", name:"MARIPÍ", rate:"N"},
        {code:"15480", name:"MUZO", rate:"N"},
        {code:"15507", name:"OTANCHE", rate:"N"},
        {code:"15531", name:"PAUNA", rate:"N"},
        {code:"15572", name:"PUERTO BOYACA", rate:"N"},
        {code:"15580", name:"QUÍPAMA", rate:"N"},
        {code:"15632", name:"SABOYÁ", rate:"N"},
        {code:"15676", name:"SAN MIGUEL DE SEMA", rate:"N"},
        {code:"15681", name:"SAN PABLO BORBUR", rate:"N"},
        {code:"15832", name:"TUNUNGUÁ", rate:"N"},
        {code:"15022", name:"ALMEIDA", rate:"N"},
        {code:"15236", name:"CHIVOR", rate:"N"},
        {code:"15322", name:"GUATEQUE", rate:"N"},
        {code:"15325", name:"GUAYATÁ", rate:"N"},
        {code:"15380", name:"LA CAPILLA", rate:"N"},
        {code:"15761", name:"SOMONDOCO", rate:"N"},
        {code:"15778", name:"SUTATENZA", rate:"N"},
        {code:"15798", name:"TENZA", rate:"N"},
        {code:"15051", name:"ARCABUCO", rate:"N"},
        {code:"15185", name:"CHITARAQUE", rate:"N"},
        {code:"15293", name:"GACHANTIVÁ", rate:"N"},
        {code:"15469", name:"MONIQUIRÁ", rate:"N"},
        {code:"15600", name:"RÁQUIRA", rate:"N"},
        {code:"15638", name:"SÁCHICA", rate:"N"},
        {code:"15664", name:"SAN JOSÉ DE PARE", rate:"N"},
        {code:"15696", name:"SANTA SOFÍA", rate:"N"},
        {code:"15686", name:"SANTANA", rate:"N"},
        {code:"15776", name:"SUTAMARCHÁN", rate:"N"},
        {code:"15808", name:"TINJACÁ", rate:"N"},
        {code:"15816", name:"TOGUÍ", rate:"N"},
        {code:"15407", name:"VILLA DE LEYVA", rate:"N"},
        {code:"15047", name:"AQUITANIA", rate:"N"},
        {code:"15226", name:"CUÍTIVA", rate:"N"},
        {code:"15272", name:"FIRAVITOBA", rate:"N"},
        {code:"15296", name:"GAMEZA", rate:"N"},
        {code:"15362", name:"IZA", rate:"N"},
        {code:"15464", name:"MONGUA", rate:"N"},
        {code:"15466", name:"MONGUÍ", rate:"N"},
        {code:"15491", name:"NOBSA", rate:"N"},
        {code:"15542", name:"PESCA", rate:"N"},
        {code:"15759", name:"SOGAMOSO", rate:"N"},
        {code:"15806", name:"TIBASOSA", rate:"N"},
        {code:"15820", name:"TÓPAGA", rate:"N"},
        {code:"15822", name:"TOTA", rate:"N"},
        {code:"15087", name:"BELÉN", rate:"N"},
        {code:"15114", name:"BUSBANZÁ", rate:"N"},
        {code:"15162", name:"CERINZA", rate:"N"},
        {code:"15215", name:"CORRALES", rate:"N"},
        {code:"15238", name:"DUITAMA", rate:"N"},
        {code:"15276", name:"FLORESTA", rate:"N"},
        {code:"15516", name:"PAIPA", rate:"N"},
        {code:"15693", name:"SAN ROSA VITERBO", rate:"N"},
        {code:"15839", name:"TUTAZÁ", rate:"N"},
        {code:"15092", name:"BETÉITIVA", rate:"N"},
        {code:"15183", name:"CHITA", rate:"N"},
        {code:"15368", name:"JERICÓ", rate:"N"},
        {code:"15537", name:"PAZ DE RÍO", rate:"N"},
        {code:"15757", name:"SOCHA", rate:"N"},
        {code:"15755", name:"SOCOTÁ", rate:"N"},
        {code:"15790", name:"TASCO", rate:"N"},
    ]},
    {code:"17", name:"CALDAS", default:"17272", cities:[
        {code:"17272", name:"FILADELFIA", rate:"N"},
        {code:"17388", name:"LA MERCED", rate:"N"},
        {code:"17442", name:"MARMATO", rate:"N"},
        {code:"17614", name:"RIOSUCIO", rate:"N"},
        {code:"17777", name:"SUPÍA", rate:"N"},
        {code:"17433", name:"MANZANARES", rate:"N"},
        {code:"17444", name:"MARQUETALIA", rate:"N"},
        {code:"17446", name:"MARULANDA", rate:"N"},
        {code:"17541", name:"PENSILVANIA", rate:"N"},
        {code:"17042", name:"ANSERMA", rate:"N"},
        {code:"17088", name:"BELALCÁZAR", rate:"N"},
        {code:"17616", name:"RISARALDA", rate:"N"},
        {code:"17665", name:"SAN JOSÉ", rate:"N"},
        {code:"17877", name:"VITERBO", rate:"N"},
        {code:"17174", name:"CHINCHINA", rate:"N"},
        {code:"17001", name:"MANIZALES", rate:"N"},
        {code:"17486", name:"NEIRA", rate:"N"},
        {code:"17524", name:"PALESTINA", rate:"N"},
        {code:"17873", name:"VILLAMARiA", rate:"N"},
        {code:"17013", name:"AGUADAS", rate:"N"},
        {code:"17050", name:"ARANZAZU", rate:"N"},
        {code:"17513", name:"PÁCORA", rate:"N"},
        {code:"17653", name:"SALAMINA", rate:"N"},
        {code:"17380", name:"LA DORADA", rate:"N"},
        {code:"17495", name:"NORCASIA", rate:"N"},
        {code:"17662", name:"SAMANÁ", rate:"N"},
        {code:"17867", name:"VICTORIA", rate:"N"},
    ]},
    {code:"18", name:"CAQUETA", default:"18029", cities:[
        {code:"18029", name:"ALBANIA", rate:"N"},
        {code:"18094", name:"BELÉN DE LOS ANDAQU", rate:"N"},
        {code:"18150", name:"CARTAGENA DEL CHAIRA", rate:"N"},
        {code:"18205", name:"CURRILLO", rate:"N"},
        {code:"18247", name:"EL DONCELLO", rate:"N"},
        {code:"18256", name:"EL PAUJIL", rate:"N"},
        {code:"18001", name:"FLORENCIA", rate:"N"},
        {code:"18410", name:"LA MONTAÑITA", rate:"N"},
        {code:"18460", name:"MILAN", rate:"N"},
        {code:"18479", name:"MORELIA", rate:"N"},
        {code:"18592", name:"PUERTO RICO", rate:"N"},
        {code:"18610", name:"SAN JOSE DEL FRAGUA", rate:"N"},
        {code:"18753", name:"SAN VICENTE DEL CAGU", rate:"N"},
        {code:"18756", name:"SOLANO", rate:"N"},
        {code:"18785", name:"SOLITA", rate:"N"},
        {code:"18860", name:"VALPARAISO", rate:"N"},
    ]},
    {code:"85", name:"CASANARE", default:"85010", cities:[
        {code:"85010", name:"AGUAZUL", rate:"N"},
        {code:"85015", name:"CHAMEZA", rate:"N"},
        {code:"85125", name:"HATO COROZAL", rate:"N"},
        {code:"85136", name:"LA SALINA", rate:"N"},
        {code:"85139", name:"MANÍ", rate:"N"},
        {code:"85162", name:"MONTERREY", rate:"N"},
        {code:"85225", name:"NUNCHÍA", rate:"N"},
        {code:"85230", name:"OROCUÉ", rate:"N"},
        {code:"85250", name:"PAZ DE ARIPORO", rate:"N"},
        {code:"85263", name:"PORE", rate:"N"},
        {code:"85279", name:"RECETOR", rate:"N"},
        {code:"85300", name:"SABANALARGA", rate:"N"},
        {code:"85315", name:"SÁCAMA", rate:"N"},
        {code:"85325", name:"SAN LUIS DE PALENQUE", rate:"N"},
        {code:"85400", name:"TÁMARA", rate:"N"},
        {code:"85410", name:"TAURAMENA", rate:"N"},
        {code:"85430", name:"TRINIDAD", rate:"N"},
        {code:"85440", name:"VILLANUEVA", rate:"N"},
        {code:"85001", name:"YOPAL", rate:"N"},
    ]},
    {code:"19", name:"CAUCA", default:"19130", cities:[
        {code:"19130", name:"CAJIBÍO", rate:"N"},
        {code:"19256", name:"EL TAMBO", rate:"N"},
        {code:"19392", name:"LA SIERRA", rate:"N"},
        {code:"19473", name:"MORALES", rate:"N"},
        {code:"19548", name:"PIENDAMO", rate:"N"},
        {code:"19001", name:"POPAYÁN", rate:"N"},
        {code:"19622", name:"ROSAS", rate:"N"},
        {code:"19760", name:"SOTARA", rate:"N"},
        {code:"19807", name:"TIMBIO", rate:"N"},
        {code:"19110", name:"BUENOS AIRES", rate:"N"},
        {code:"19142", name:"CALOTO", rate:"N"},
        {code:"19212", name:"CORINTO", rate:"N"},
        {code:"19455", name:"MIRANDA", rate:"N"},
        {code:"19513", name:"PADILLA", rate:"N"},
        {code:"19573", name:"PUERTO TEJADA", rate:"N"},
        {code:"19698", name:"SANTANDER DE QUILICHAO", rate:"N"},
        {code:"19780", name:"SUAREZ", rate:"N"},
        {code:"19845", name:"VILLA RICA", rate:"N"},
        {code:"19318", name:"GUAPI", rate:"N"},
        {code:"19418", name:"LOPEZ", rate:"N"},
        {code:"19809", name:"TIMBIQUI", rate:"N"},
        {code:"19137", name:"CALDONO", rate:"N"},
        {code:"19355", name:"INZÁ", rate:"N"},
        {code:"19364", name:"JAMBALO", rate:"N"},
        {code:"19517", name:"PAEZ", rate:"N"},
        {code:"19585", name:"PURACE", rate:"N"},
        {code:"19743", name:"SILVIA", rate:"N"},
        {code:"19821", name:"TORIBIO", rate:"N"},
        {code:"19824", name:"TOTORO", rate:"N"},
        {code:"19022", name:"ALMAGUER", rate:"N"},
        {code:"19050", name:"ARGELIA", rate:"N"},
        {code:"19075", name:"BALBOA", rate:"N"},
        {code:"19100", name:"BOLÍVAR", rate:"N"},
        {code:"19290", name:"FLORENCIA", rate:"N"},
        {code:"19397", name:"LA VEGA", rate:"N"},
        {code:"19450", name:"MERCADERES", rate:"N"},
        {code:"19532", name:"PATIA", rate:"N"},
        {code:"19533", name:"PIAMONTE", rate:"N"},
        {code:"19693", name:"SAN SEBASTIAN", rate:"N"},
        {code:"19701", name:"SANTA ROSA", rate:"N"},
        {code:"19785", name:"SUCRE", rate:"N"},
    ]},
    {code:"20", name:"CESAR", default:"2000", cities:[
        {code:"2000", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"27", name:"CHOCO", default:"2700", cities:[
        {code:"2700", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"23", name:"CORDOBA", default:"2300", cities:[
        {code:"2300", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"25", name:"CUNDINAMARCA", default:"2500", cities:[
        {code:"2500", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"94", name:"GUAINIA", default:"9400", cities:[
        {code:"9400", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"95", name:"GUAVIARE", default:"9500", cities:[
        {code:"9500", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"41", name:"HUILA", default:"4100", cities:[
        {code:"4100", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"44", name:"LA GUAJIRA", default:"4400", cities:[
        {code:"4400", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"47", name:"MAGDALENA", default:"4700", cities:[
        {code:"4700", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"50", name:"META", default:"5000", cities:[
        {code:"5000", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"52", name:"NARIÑO",  default:"5200", cities:[
        {code:"5200", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"54", name:"NORTE DE SANTANDER", default:"5400", cities:[
        {code:"5400", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"86", name:"PUTUMAYO", default:"8600", cities:[
        {code:"8600", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"63", name:"QUINDIO", default:"6300", cities:[
        {code:"6300", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"66", name:"RISARALDA", default:"6600", cities:[
        {code:"6600", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"68", name:"SANTANDER", default:"6800", cities:[
        {code:"6800", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"70", name:"SUCRE", default:"7000", cities:[
        {code:"7000", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"73", name:"TOLIMA", default:"7300", cities:[
        {code:"7300", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"76", name:"VALLE DEL CAUCA", default:"7600", cities:[
        {code:"7600", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"97", name:"VAUPES", default:"9700", cities:[
        {code:"9700", name:"NO CARGADAS", rate:"E"},
    ]},
    {code:"99", name:"VICHADA", default:"9900", cities:[
        {code:"9900", name:"NO CARGADAS", rate:"E"},
    ]}
]

const Cost = [
    {   
        rate:"L", 
        label:"Local", 
        cost1:{rIni:1, rInf:3, val:6735}, 
        cost2:{rIni:4, rInf:5, val:9750}, 
        cost3:{rIni:6, rInf:8, val:9750},
        costAdd:500,
    },
    {
        rate:"R", 
        label:"Regional", 
        cost1:{rIni:1, rInf:3, val:7652}, 
        cost2:{rIni:4, rInf:5, val:10667}, 
        cost3:{rIni:6, rInf:8, val:11567},
        costAdd:500,
    },
    {
        rate:"N", 
        label:"Nacional", 
        cost1:{rIni:1, rInf:3, val:14400}, 
        cost2:{rIni:4, rInf:5, val:15900}, 
        cost3:{rIni:6, rInf:8, val:17400},
        costAdd:500,
    },
    {   
        rate:"E", 
        label:"Expecial", 
        cost1:{rIni:1, rInf:3, val:20400}, 
        cost2:{rIni:4, rInf:5, val:28900}, 
        cost3:{rIni:6, rInf:8, val:35400},
        costAdd:1000,
    }
]

const Global = {factor:2500, sure:0.005, deliveryDays:10 }

const defStateCity = {code:"11", name:"BOGOTA", cities: {code:"11001", name:"BOGOTA D.C.", rate:"L"} }

function getNameState(codeState){
    for(var i=0; i<States.length; i++)
        if(States[i].code === codeState)return States[i].name;
}

function getNameCity(codeCity){
    var codeState = codeCity.substring(0,2);
    for(var i=0; i<States.length; i++)
    if(States[i].code === codeState)
    for(var j=0; j<States[i].cities.length; j++)if(States[i].cities[j].code == codeCity)
    return States[i].cities[j].name;
}

function getPrice(calc, pvp, cost, idTax, taxes){
    var valTax;
    //Identificamos el valor de impuesto que le corresponde;
    for(var i = 0; i<taxes.length; i++){
        if(taxes[i]._id == idTax){
            valTax = (parseInt(taxes[i].value)/100)+1;
            break;
        }
    }
    
    //Precio más Fee acordado con la tienda 
    var priceOld = (parseInt(calc.v4)/100)+1;
    priceOld = Math.round((pvp*priceOld),-1);

    //Precio antes de iva 
    var priceOldOutTax = priceOld/valTax;

    //Incentivo calculado antes de iva sobre el valor total 
    var incentive = priceOldOutTax*(parseInt(calc.v3)/100);
    
    //Margen recidual una vez se quita el incentivo calculado
    var margenResidVal = (pvp-cost)-incentive;

    //Valor del margen protegido 
    var margenProtVal = margenResidVal*(parseInt(calc.v1)/100);

    //Valor del margen minimo 
    var margenMinVal = pvp*(parseInt(calc.v2)/100);

    //Identificamos si el margen minimo es mayor que el protegido 
    //Si es de esta manera tomamos el margen minimo para proteger si no el margen protegido 
    var valorProtegido = (margenMinVal < margenProtVal)?margenMinVal:margenProtVal;

    var totalComercial = margenResidVal - valorProtegido;
    var discountVar = totalComercial*(parseInt(calc.v5)/100);

    //Precio redondeado a comercial
    var newPrice = parseInt(roundPrice(priceOld-discountVar));
    var dicountMarg = Math.round(((priceOld-newPrice)/priceOld)*100, -1);
    var discountP = Math.round(priceOld - newPrice);
    var taxValue = newPrice-(newPrice/valTax);
    var taxOldValue = priceOld-(priceOld/valTax);
    return {newPrice,priceOld,discountP,dicountMarg,taxValue, taxOldValue}
}

function roundPrice(prices){
    var value = String(Math.round(prices,-1));
    if(value.length === 4) return value.substring(0,1)+"999";
    if(value.length === 5) return value.substring(0,2)+"999";
    if(value.length === 6) return value.substring(0,3)+"999";
    if(value.length === 7) return value.substring(0,3)+"9999";
    if(value.length === 8) return value.substring(0,3)+"99999";
    return parseInt(value);
}

function calcShipping(cart, state, city){

    var tipeCost = {};
    var volHeigth = 0;
    var peso = 0;
    var priceTotal  = 0;

    //Identificamos la tarifa que corresponde a la ciudad de entrega 
    for(var s=0; s<States.length; s++){
        if(States[s].code == state){
            for(var c=0; c<States[s].cities.length; c++){
                if(States[s].cities[c].code == city){
                    for(var sh = 0; sh<Cost.length; sh++){
                        if(Cost[sh].rate == States[s].cities[c].rate){
                            tipeCost = Cost[sh];
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }

    cart.forEach(val => {
        priceTotal += (val.newPrice*val.alot);
        volHeigth += (val.bDimensions.heigth * val.bDimensions.deep * val.bDimensions.width );
        peso += val.bDimensions.weight;
    });
    //Obtenemos el volumen y dividimos en el factor 2500
    volHeigth = volHeigth/Global.factor;
    //Seleccionamos entre peso y volumen el mayor
    volHeigth = (volHeigth > peso)?volHeigth:peso;
    //Aumentamos en el peso 2 quilos para q
    volHeigth += 2;
    var cost = 0;
    if(volHeigth >= tipeCost.cost1.rIni && volHeigth <= tipeCost.cost1.rInf) cost = tipeCost.cost1.val;
    if(volHeigth >= tipeCost.cost2.rIni && volHeigth <= tipeCost.cost2.rInf) cost = tipeCost.cost2.val;
    if(volHeigth >= tipeCost.cost3.rIni && volHeigth <= tipeCost.cost3.rInf) cost = tipeCost.cost3.val;
    if(cost === 0){
        volHeigth = volHeigth - tipeCost.cost3.rInf;
        cost = tipeCost.cost3.val+(volHeigth*tipeCost.costAdd);
    }
    cost += (priceTotal*Global.sure);
    return Math.round(cost,-1);
    
}

const funct = {getPrice, calcShipping, getNameState, getNameCity, defStateCity,Global}

module.exports = funct;
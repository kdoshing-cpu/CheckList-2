import { Phase, Workshop } from "./types";

export const workshopsData: Workshop[] = [
  { id: "w1", name: "Repair Master", address: "Cam. Temuco-Labranza km 10", phone: "" },
  { id: "w2", name: "Taller Nuevo-Car", address: "1 Norte 480, Labranza", phone: "9 3017 2718" },
  { id: "w3", name: "Taller Villa La Florida", address: "Labranza", phone: "9 7106 2380" },
  { id: "w4", name: "Taller Mecánico Labranza", address: "Camino a Labranza", phone: "" },
  { id: "w5", name: "R&J Garage Performance", address: "Km 17,5, Rengalil", phone: "" },
  { id: "w6", name: "Taller automotriz Pje. 1 Nte 498", address: "Pje. 1 Nte 498", phone: "" },
  { id: "w7", name: "Portillo Sur", address: "Temuco", phone: "" },
  { id: "w8", name: "Vila", address: "Temuco", phone: "" },
  { id: "w9", name: "Gamada", address: "Temuco", phone: "" },
  { id: "w10", name: "Cofre e Hijos", address: "Temuco", phone: "" },
  { id: "w11", name: "Garage Urrutia", address: "Temuco", phone: "" },
  { id: "w12", name: "Mejac Ferretería", address: "4 Oriente #159, Labranza", phone: "" },
  { id: "w13", name: "PinturasPLC", address: "Villa Alegre 721, Padre Las Casas", phone: "" },
  { id: "w14", name: "Mundo Pintura", address: "Longitudinal 2375, Padre Las Casas", phone: "" },
  { id: "w15", name: "Centro Color", address: "Las Camelias 1354, Temuco", phone: "" },
];

export const checklistData: Phase[] = [
  {
    id: "fase-1",
    title: "FASE 1 — VALIDACIÓN DE MERCADO Y PROSPECCIÓN",
    subtitle: "Semanas 1-3",
    tasks: [
      {
        id: "t1-1",
        title: "Imprimir hoja de prospección",
        description: "Prepara un formulario con preguntas clave: qué productos compran actualmente, dónde los adquieren, frecuencia de gasto y qué necesidades no están siendo cubiertas por sus proveedores actuales.",
      },
      {
        id: "t1-2",
        title: "Visitar Repair Master",
        description: "Ubicado en Cam. Temuco-Labranza km 10. Es uno de los talleres más grandes (37 reseñas) y un cliente potencial crítico para tu volumen inicial.",
        links: [{ label: "Sitio Web", url: "https://www.gruposayer.com" }]
      },
      {
        id: "t1-3",
        title: "Visitar Taller Nuevo-Car",
        description: "1 Norte 480, Labranza. Taller formal con más de 15 años de trayectoria. Fundamental para entender la lealtad del cliente en la zona.",
        links: [{ label: "Info Sayer", url: "https://www.gruposayer.com/contenidos/donde_comprar_sayer.php" }]
      },
      {
        id: "t1-4",
        title: "Visitar Taller Villa La Florida",
        description: "Ubicado en Labranza. Taller establecido que representa la demanda local directa dentro del casco urbano.",
        links: [{ label: "Repintado Automotriz", url: "https://www.gruposayer.com/mobile/Repintado_Automotriz" }]
      },
      {
        id: "t1-5",
        title: "Visitar Taller Mecánico Labranza",
        description: "Camino a Labranza. Ofrecen mecánica general y servicio a domicilio, lo que puede requerir consumibles rápidos y entrega inmediata.",
      },
      {
        id: "t1-6",
        title: "Visitar R&J Garage Performance",
        description: "Km 17,5, Rengalil. Atiende Labranza y alrededores, ideal para prospección de talleres en las afueras.",
      },
      {
        id: "t1-7",
        title: "Visitar Taller automotriz (Pje. 1 Nte 498)",
        description: "Taller con excelente reputación (5.0 estrellas). Su nivel de exigencia te dictará la calidad de insumos necesarios.",
      },
      {
        id: "t1-8",
        title: "Contactar a talleres de Temuco/Padre Las Casas",
        description: "Portillo Sur, Vila, Gamada, Cofre e Hijos, Garage Urrutia. Aunque están más lejos, conocer sus precios te ayuda a ser competitivo.",
      },
      {
        id: "t1-9",
        title: "Identificar talleres informales/industriales",
        description: "Muchos talleres no están en Google Maps. Recorre Labranza en vehículo buscando galpones con autos en reparación.",
      },
      {
        id: "t1-10",
        title: "Registrar en Excel la base de datos",
        description: "Nombre, dirección, teléfono, productos que compra, gasto mensual estimado y nivel de satisfacción actual. Esto es el activo más valioso de tu negocio.",
      },
      {
        id: "t1-11",
        title: "Análisis de competencia: Mejac Ferretería",
        description: "4 Oriente #159, Labranza. Confirma que no tengan pintura automotriz para validar tu nicho sin competencia directa en el pueblo.",
      },
      {
        id: "t1-12",
        title: "Análisis de competencia: PinturasPLC",
        description: "Villa Alegre 721, Padre Las Casas. Es tu competidor más cercano. Anota sus precios de kits de barniz (~$21.250) y masillas.",
        links: [{ label: "Instagram PinturasPLC", url: "https://www.instagram.com/pinturasplc/" }]
      },
    ]
  },
  {
    id: "fase-2",
    title: "FASE 2 — PLAN DE NEGOCIO Y ESTRUCTURA LEGAL",
    subtitle: "Semanas 3-6",
    tasks: [
      {
        id: "t2-1",
        title: "Calcular inversión inicial y punto de equilibrio",
        description: "Define cuánto necesitas para stock inicial, arriendo y permisos. El punto de equilibrio te dirá cuántos kits de pintura debes vender al día para no perder dinero.",
      },
      {
        id: "t2-2",
        title: "Constitución de empresa (SpA o EIRL)",
        description: "Usa el Registro de Empresas y Sociedades (Tu Empresa en un Día). La SpA te permite tener socios fácilmente en el futuro.",
      },
      {
        id: "t2-3",
        title: "Inicio de actividades y giros en SII",
        description: "Activa el giro de 'Comercio al por menor de pinturas, barnices y lacas'. Activa la facturación electrónica de inmediato.",
      },
      {
        id: "t2-4",
        title: "Solicitar Informe de Emplazamiento",
        description: "Trámite municipal esencial para asegurar que en el local que elijas se permite vender químicos e inflamables.",
      },
      {
        id: "t2-5",
        title: "Tramitar Patente Municipal y Autorización Sanitaria",
        description: "El costo suele ser entre 2.5 y 5 por mil del capital. Necesitarás autorización para manejo de sustancias peligrosas (inflamables).",
        links: [{ label: "Requisitos Interior", url: "https://www.interior.gob.cl/sitio-2010-2014/dco_requisitos.html" }]
      }
    ]
  },
  {
    id: "fase-3",
    title: "FASE 3 — PROVEEDORES Y SURTIDO INICIAL",
    subtitle: "Semanas 4-8",
    tasks: [
      {
        id: "t3-1",
        title: "Contactar Sherwin-Williams Automotriz",
        description: "Línea base más importante. Contacta a Patricio Vega (+56 9 9730 4712) para precios de distribuidor.",
      },
      {
        id: "t3-2",
        title: "Contactar SIPA e Iverzur",
        description: "SIPA es excelente alternativa nacional. Iverzur en Temuco puede ser un proveedor mayorista rápido si te quedas sin stock.",
      },
      {
        id: "t3-3",
        title: "Proveedor de Abrasivos (Norton/3M)",
        description: "Contactar Comercial Novasur para Norton y 3M Chile para cintas y masking tape automotriz.",
      },
      {
        id: "t3-4",
        title: "Configuración del surtido inicial",
        description: "Sugerencia: 60% consumibles (lijas, cintas), 25% pintura (barnices, bases), 15% accesorios (pistolas, EPP).",
      }
    ]
  },
  {
    id: "fase-4",
    title: "FASE 4 — LOCAL Y EQUIPAMIENTO",
    subtitle: "Semanas 6-10",
    tasks: [
      {
        id: "t4-1",
        title: "Búsqueda y arriendo del local",
        description: "Prioriza avenidas principales en Labranza con espacio para carga/descarga y buena ventilación para químicos.",
      },
      {
        id: "t4-2",
        title: "Acondicionamiento y Seguridad",
        description: "Instala estanterías metálicas, extintores ABC de 6kg y señalética de seguridad obligatoria para inflamables.",
      },
      {
        id: "t4-3",
        title: "Equipamiento POS e Informática",
        description: "Computador, impresora térmica y sistema de ventas básico. El orden en el inventario desde el día 1 es vital.",
      }
    ]
  },
  {
    id: "fase-5",
    title: "FASE 5 — MARKETING Y LANZAMIENTO",
    subtitle: "Semanas 8-12",
    tasks: [
      {
        id: "t5-1",
        title: "Creación de Identidad Digital",
        description: "Crea Instagram, Facebook y perfil de Google Business. En Labranza, aparecer en Google Maps es clave para los talleres que vienen de fuera.",
      },
      {
        id: "t5-2",
        title: "Estrategia B2B: Visita y Catálogo",
        description: "Diseña un catálogo en PDF para WhatsApp. Vuelve a visitar los 18 talleres con una oferta agresiva de apertura.",
      },
      {
        id: "t5-3",
        title: "Implementar Delivery en Labranza",
        description: "Tu gran ventaja competitiva. Los talleres no quieren dejar de trabajar para ir a buscar un diluyente a Padre Las Casas.",
      }
    ]
  }
];

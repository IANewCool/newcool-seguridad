'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Comisarias por region
const COMISARIAS = [
  { id: 1, nombre: '1ra Comisaria Arica', region: 'Arica y Parinacota', direccion: '18 de Septiembre 101', telefono: '58 2232133', tipo: 'Prefectura' },
  { id: 2, nombre: '1ra Comisaria Iquique', region: 'Tarapaca', direccion: 'Serrano 145', telefono: '57 2411133', tipo: 'Prefectura' },
  { id: 3, nombre: '1ra Comisaria Antofagasta', region: 'Antofagasta', direccion: 'Sucre 402', telefono: '55 2268133', tipo: 'Prefectura' },
  { id: 4, nombre: '1ra Comisaria Copiapo', region: 'Atacama', direccion: 'OHiggins 690', telefono: '52 2212133', tipo: 'Prefectura' },
  { id: 5, nombre: '1ra Comisaria La Serena', region: 'Coquimbo', direccion: 'Cordovez 281', telefono: '51 2200133', tipo: 'Prefectura' },
  { id: 6, nombre: '1ra Comisaria Valparaiso', region: 'Valparaiso', direccion: 'Errazuriz 1050', telefono: '32 2507133', tipo: 'Prefectura' },
  { id: 7, nombre: '1ra Comisaria Santiago Centro', region: 'Metropolitana', direccion: 'General Mackenna 1314', telefono: '2 2922 1133', tipo: 'Prefectura' },
  { id: 8, nombre: '3ra Comisaria Providencia', region: 'Metropolitana', direccion: 'Eliodoro Yanez 832', telefono: '2 2922 3133', tipo: 'Comisaria' },
  { id: 9, nombre: '12va Comisaria Las Condes', region: 'Metropolitana', direccion: 'Apoquindo 6400', telefono: '2 2922 1233', tipo: 'Comisaria' },
  { id: 10, nombre: '19na Comisaria Nunoa', region: 'Metropolitana', direccion: 'Jorge Washington 201', telefono: '2 2922 1933', tipo: 'Comisaria' },
  { id: 11, nombre: '1ra Comisaria Rancagua', region: 'OHiggins', direccion: 'Campos 367', telefono: '72 2230133', tipo: 'Prefectura' },
  { id: 12, nombre: '1ra Comisaria Talca', region: 'Maule', direccion: '1 Sur 1234', telefono: '71 2515133', tipo: 'Prefectura' },
  { id: 13, nombre: '1ra Comisaria Concepcion', region: 'Biobio', direccion: 'Barros Arana 541', telefono: '41 2861133', tipo: 'Prefectura' },
  { id: 14, nombre: '1ra Comisaria Temuco', region: 'Araucania', direccion: 'Bulnes 599', telefono: '45 2747133', tipo: 'Prefectura' },
  { id: 15, nombre: '1ra Comisaria Valdivia', region: 'Los Rios', direccion: 'Beauchef 599', telefono: '63 2221133', tipo: 'Prefectura' },
  { id: 16, nombre: '1ra Comisaria Puerto Montt', region: 'Los Lagos', direccion: 'Urmeneta 505', telefono: '65 2483133', tipo: 'Prefectura' }
];

// Numeros de emergencia
const EMERGENCIAS = [
  { numero: '133', servicio: 'Carabineros', descripcion: 'Emergencias policiales', icono: '🚔' },
  { numero: '131', servicio: 'Ambulancia (SAMU)', descripcion: 'Emergencias medicas', icono: '🚑' },
  { numero: '132', servicio: 'Bomberos', descripcion: 'Incendios y rescates', icono: '🚒' },
  { numero: '134', servicio: 'PDI', descripcion: 'Investigacion criminal', icono: '🔍' },
  { numero: '137', servicio: 'Fono Drogas', descripcion: 'Denuncias de drogas', icono: '💊' },
  { numero: '149', servicio: 'Fono Familia', descripcion: 'Violencia intrafamiliar', icono: '👨‍👩‍👧' },
  { numero: '600 400 0101', servicio: 'Fiscalia', descripcion: 'Denuncias penales', icono: '⚖️' },
  { numero: '800 220 040', servicio: 'SernamEG', descripcion: 'Violencia contra la mujer', icono: '🛡️' }
];

// Tipos de delitos
const DELITOS = [
  { categoria: 'Contra las personas', delitos: ['Homicidio', 'Lesiones', 'Secuestro', 'Amenazas'], plazo: '10 años', color: 'red' },
  { categoria: 'Contra la propiedad', delitos: ['Robo', 'Hurto', 'Estafa', 'Apropiacion indebida'], plazo: '5 años', color: 'orange' },
  { categoria: 'Violencia intrafamiliar', delitos: ['Maltrato fisico', 'Maltrato psicologico', 'Violencia economica'], plazo: '5 años', color: 'purple' },
  { categoria: 'Delitos sexuales', delitos: ['Abuso sexual', 'Violacion', 'Acoso sexual'], plazo: '10 años', color: 'pink' },
  { categoria: 'Delitos economicos', delitos: ['Fraude', 'Lavado de activos', 'Delitos tributarios'], plazo: '5 años', color: 'yellow' },
  { categoria: 'Delitos informaticos', delitos: ['Hackeo', 'Phishing', 'Suplantacion de identidad'], plazo: '5 años', color: 'cyan' }
];

// Derechos del detenido
const DERECHOS_DETENIDO = [
  { derecho: 'Conocer el motivo', descripcion: 'Deben informarte por que te detienen', icono: '📋' },
  { derecho: 'Guardar silencio', descripcion: 'No estas obligado a declarar contra ti mismo', icono: '🤐' },
  { derecho: 'Abogado', descripcion: 'Derecho a comunicarte con un abogado', icono: '⚖️' },
  { derecho: 'Llamada telefonica', descripcion: 'Puedes avisar a un familiar de tu detencion', icono: '📞' },
  { derecho: 'Trato digno', descripcion: 'No pueden torturarte ni maltratarte', icono: '🛡️' },
  { derecho: 'Control de detencion', descripcion: 'Audiencia ante juez en 24 horas', icono: '⏰' },
  { derecho: 'Atencion medica', descripcion: 'Si lo necesitas, deben darte atencion', icono: '🏥' },
  { derecho: 'Interprete', descripcion: 'Si no hablas español, tienes derecho a traductor', icono: '🗣️' }
];

// Proceso de denuncia
const PROCESO_DENUNCIA = [
  { paso: 1, titulo: 'Acudir a la autoridad', descripcion: 'Carabineros, PDI o Fiscalia', tiempo: 'Inmediato' },
  { paso: 2, titulo: 'Relatar los hechos', descripcion: 'Describir que, cuando, donde y quien', tiempo: '30-60 min' },
  { paso: 3, titulo: 'Entregar antecedentes', descripcion: 'Pruebas, testigos, documentos', tiempo: 'Variable' },
  { paso: 4, titulo: 'Recibir comprobante', descripcion: 'Numero de parte o RUC', tiempo: 'Inmediato' },
  { paso: 5, titulo: 'Seguimiento', descripcion: 'Consultar estado en Fiscalia', tiempo: 'Continuo' }
];

// Glosario
const GLOSARIO = [
  { termino: 'RUC', definicion: 'Rol Unico de Causa, numero que identifica tu denuncia en Fiscalia' },
  { termino: 'RIT', definicion: 'Rol Interno del Tribunal, numero de la causa en tribunales' },
  { termino: 'Querella', definicion: 'Denuncia formal ante tribunales donde la victima participa activamente' },
  { termino: 'Flagrancia', definicion: 'Cuando el delincuente es sorprendido cometiendo el delito' },
  { termino: 'Control de identidad', definicion: 'Facultad policial de verificar identidad (max 8 horas)' },
  { termino: 'Detencion', definicion: 'Privacion de libertad por orden judicial o flagrancia' },
  { termino: 'Prision preventiva', definicion: 'Medida cautelar de privacion de libertad durante el proceso' },
  { termino: 'Caucion', definicion: 'Garantia economica para obtener libertad provisional' },
  { termino: 'Arraigo', definicion: 'Prohibicion de salir del pais durante investigacion' },
  { termino: 'Sobreseimiento', definicion: 'Termino del caso sin condena por falta de pruebas' },
  { termino: 'Formalizacion', definicion: 'Acto donde Fiscalia comunica los cargos al imputado' },
  { termino: 'Salida alternativa', definicion: 'Acuerdo reparatorio o suspension condicional' }
];

export default function SeguridadModule() {
  const [busqueda, setBusqueda] = useState('');
  const [seccionActiva, setSeccionActiva] = useState('buscador');

  // Calculadora de plazos
  const [fechaDelito, setFechaDelito] = useState('');
  const [tipoDelito, setTipoDelito] = useState('5');

  const comisariasFiltradas = COMISARIAS.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.region.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.direccion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const calcularPrescripcion = () => {
    if (!fechaDelito) return null;

    const fecha = new Date(fechaDelito);
    const años = parseInt(tipoDelito);
    const fechaPrescripcion = new Date(fecha);
    fechaPrescripcion.setFullYear(fechaPrescripcion.getFullYear() + años);

    const hoy = new Date();
    const diasRestantes = Math.ceil((fechaPrescripcion.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));

    return {
      fechaPrescripcion,
      diasRestantes,
      prescrito: diasRestantes <= 0
    };
  };

  const prescripcion = calcularPrescripcion();

  const secciones = [
    { id: 'buscador', nombre: 'Comisarias', icono: '🔍' },
    { id: 'emergencias', nombre: 'Emergencias', icono: '🚨' },
    { id: 'delitos', nombre: 'Delitos', icono: '⚠️' },
    { id: 'calculadora', nombre: 'Plazos', icono: '🧮' },
    { id: 'derechos', nombre: 'Derechos', icono: '⚖️' },
    { id: 'glosario', nombre: 'Glosario', icono: '📖' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-rose-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">🚔</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Seguridad - NewCooltura Informada
            </h1>
            <p className="text-red-100">
              Comisarias, emergencias, tipos de delitos, plazos y derechos ciudadanos
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="sticky top-0 z-40 bg-slate-800/90 backdrop-blur border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-3">
            {secciones.map((seccion) => (
              <button
                key={seccion.id}
                onClick={() => setSeccionActiva(seccion.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  seccionActiva === seccion.id
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <span>{seccion.icono}</span>
                <span className="text-sm font-medium">{seccion.nombre}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Comisarias */}
        {seccionActiva === 'buscador' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-slate-800 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscador de Comisarias
              </h2>
              <input
                type="text"
                placeholder="Buscar por region, ciudad o direccion..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <p className="text-sm text-gray-400 mt-2">
                {comisariasFiltradas.length} comisarias encontradas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {comisariasFiltradas.map((comisaria, i) => (
                <motion.div
                  key={comisaria.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-red-500 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-white">{comisaria.nombre}</h3>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                      {comisaria.region}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-gray-500">📍</span> {comisaria.direccion}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">📞</span> {comisaria.telefono}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">🏛️</span> {comisaria.tipo}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Numeros de Emergencia */}
        {seccionActiva === 'emergencias' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🚨</span> Numeros de Emergencia
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {EMERGENCIAS.map((emergencia, i) => (
                <motion.div
                  key={emergencia.numero}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 text-center"
                >
                  <span className="text-3xl mb-3 block">{emergencia.icono}</span>
                  <span className="text-2xl font-bold text-red-400 block mb-2">{emergencia.numero}</span>
                  <h3 className="font-bold text-white mb-1">{emergencia.servicio}</h3>
                  <p className="text-sm text-gray-400">{emergencia.descripcion}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="font-bold text-white mb-3">📱 App de Seguridad</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <strong>Comisaria Virtual:</strong> comisariavirtual.cl - Denuncias online</li>
                <li>• <strong>App Carabineros:</strong> Emergencias desde el celular</li>
                <li>• <strong>144:</strong> Fono Niños - Maltrato infantil</li>
                <li>• <strong>147:</strong> Orientacion Ciudadana Carabineros</li>
              </ul>
            </div>
          </motion.section>
        )}

        {/* Tipos de Delitos */}
        {seccionActiva === 'delitos' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>⚠️</span> Tipos de Delitos y Plazos
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DELITOS.map((categoria, i) => (
                <motion.div
                  key={categoria.categoria}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white">{categoria.categoria}</h3>
                    <span className={`px-2 py-1 bg-${categoria.color}-500/20 text-${categoria.color}-400 text-xs rounded-full`}>
                      Prescribe: {categoria.plazo}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {categoria.delitos.map((delito, j) => (
                      <li key={j} className="text-sm text-gray-400 flex items-center gap-2">
                        <span className="text-red-400">•</span> {delito}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">📋 Donde Denunciar</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">1.</span>
                    <div>
                      <span className="text-white font-medium">Carabineros (133)</span>
                      <p className="text-gray-400">Cualquier comisaria o telefono</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">2.</span>
                    <div>
                      <span className="text-white font-medium">PDI (134)</span>
                      <p className="text-gray-400">Brigadas especializadas</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">3.</span>
                    <div>
                      <span className="text-white font-medium">Fiscalia</span>
                      <p className="text-gray-400">fiscaliadechile.cl</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">4.</span>
                    <div>
                      <span className="text-white font-medium">Comisaria Virtual</span>
                      <p className="text-gray-400">comisariavirtual.cl</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">⚡ Proceso de Denuncia</h3>
                <div className="space-y-3">
                  {PROCESO_DENUNCIA.map((paso) => (
                    <div key={paso.paso} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center flex-shrink-0">
                        {paso.paso}
                      </span>
                      <div>
                        <span className="text-white font-medium text-sm">{paso.titulo}</span>
                        <p className="text-gray-400 text-xs">{paso.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Calculadora de Plazos */}
        {seccionActiva === 'calculadora' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🧮</span> Calculadora de Prescripcion
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">Datos del Delito</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Fecha del delito</label>
                    <input
                      type="date"
                      value={fechaDelito}
                      onChange={(e) => setFechaDelito(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Plazo de prescripcion</label>
                    <select
                      value={tipoDelito}
                      onChange={(e) => setTipoDelito(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="5">5 años (robos, hurtos, estafas)</option>
                      <option value="10">10 años (delitos graves, sexuales)</option>
                      <option value="15">15 años (homicidio calificado)</option>
                      <option value="1">1 año (faltas menores)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">Resultado</h3>

                {prescripcion ? (
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-gray-400">Fecha del delito</span>
                      <span className="text-white">{new Date(fechaDelito).toLocaleDateString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-gray-400">Plazo</span>
                      <span className="text-white">{tipoDelito} años</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-gray-400">Prescribe el</span>
                      <span className="text-white">{prescripcion.fechaPrescripcion.toLocaleDateString('es-CL')}</span>
                    </div>

                    <div className={`flex justify-between py-3 rounded-lg px-3 mt-4 ${
                      prescripcion.prescrito
                        ? 'bg-red-500/20'
                        : prescripcion.diasRestantes < 365
                        ? 'bg-yellow-500/20'
                        : 'bg-green-500/20'
                    }`}>
                      <span className="text-white font-bold">Estado</span>
                      <span className={`font-bold ${
                        prescripcion.prescrito
                          ? 'text-red-400'
                          : prescripcion.diasRestantes < 365
                          ? 'text-yellow-400'
                          : 'text-green-400'
                      }`}>
                        {prescripcion.prescrito
                          ? 'Prescrito'
                          : `${prescripcion.diasRestantes} dias restantes`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    Ingresa la fecha del delito para calcular
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  * Calculo referencial. Consulta con un abogado para casos especificos.
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Derechos del Detenido */}
        {seccionActiva === 'derechos' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>⚖️</span> Derechos del Detenido
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {DERECHOS_DETENIDO.map((derecho, i) => (
                <motion.div
                  key={derecho.derecho}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 text-center"
                >
                  <span className="text-3xl mb-3 block">{derecho.icono}</span>
                  <h3 className="font-bold text-white mb-2">{derecho.derecho}</h3>
                  <p className="text-sm text-gray-400">{derecho.descripcion}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
              <h3 className="font-bold text-white mb-3">⚠️ Importante Recordar</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• El control de identidad dura MAXIMO 8 horas</li>
                <li>• La detencion sin orden judicial debe ser por flagrancia</li>
                <li>• Tienes derecho a audiencia ante juez en 24 horas</li>
                <li>• NO firmes nada sin leerlo y entenderlo</li>
                <li>• Puedes solicitar defensor publico gratuitamente</li>
              </ul>
            </div>

            <div className="mt-6 bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold text-white mb-4">📞 Contactos de Ayuda</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-red-400 block">600 440 0113</span>
                  <p className="text-sm text-gray-400">Defensoria Penal Publica</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-red-400 block">600 360 4000</span>
                  <p className="text-sm text-gray-400">INDH (Derechos Humanos)</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-red-400 block">600 400 0101</span>
                  <p className="text-sm text-gray-400">Fiscalia de Chile</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📖</span> Glosario de Seguridad
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {GLOSARIO.map((item, i) => (
                <motion.div
                  key={item.termino}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                >
                  <h3 className="font-bold text-red-400 mb-1">{item.termino}</h3>
                  <p className="text-sm text-gray-400">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Seguridad - Un modulo de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-red-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Conoce tus derechos y como ejercerlos
          </p>
        </div>
      </footer>
    </div>
  );
}

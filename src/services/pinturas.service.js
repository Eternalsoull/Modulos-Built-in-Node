const { models } = require('../libs/sequelize');
let carrito = [];


async function getPinturas() {
  const pinturas = await models.Pintura.findAll();
  return pinturas;
}

async function store(body) {
  const pintura = await models.Pintura.create(body);
  return pintura;
}

async function update(id, body) {
  const pintura = await models.Pintura.findByPk(id);
  pintura.update(body);
  return pintura;
}

async function destroy(id) {
  const pintura = await models.Pintura.findByPk(id);
  pintura.destroy();
  return pintura;
}

//funcion para obtener el array del carrito
function getCarrito() {
  return carrito;
}

// Función para agregar una pintura al carrito
async function agregarCarrito(id) {
  const pintura = await models.Pintura.findByPk(id);
  
  if (pintura) {
    carrito.push(pintura);
    console.log(carrito);
  }

  return carrito;
}

//funcion para eliminar una pintura del carrito
async function eliminarCarrito(id) {

  const pintura = await models.Pintura.findByPk(id);
  
  if (pintura) {
    carrito.pop(pintura);
    console.log(carrito);
  }

  return carrito;
}

async function crearOrden({ documento, nombre, apellidos, direccion, telefono, pinturas }) {
    try {
      // Crea la orden en la base de datos
      const orden = await models.Pedido.create({ documento, nombre, apellidos, direccion, telefono });

  
      // Asocia las pinturas con la orden
      const pinturasOrden = await models.Pintura.findAll({ where: { id: pinturas } });
  
      await orden.setPinturas(pinturasOrden);
  
      return orden;
    } catch (error) {
      console.error('Error al crear la orden:', error);
      throw error;
    }
  }

  //funcion para limpiar el carrito
function limpiarCarrito() {
    carrito = [];
    }



module.exports = {
  getPinturas,
  store,
  update,
  destroy,
  agregarCarrito,
    eliminarCarrito,
    getCarrito,
    crearOrden,
    limpiarCarrito
};

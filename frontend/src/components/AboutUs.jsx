// import React from 'react'

const AboutUs = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-64">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Sobre Nosotros
        </h1>

        {/* Espacio para una imagen */}

        <div className="relative flex justify-center mb-8">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/37/ad/d4/getlstd-property-photo.jpg?w=1400&h=-1&s=1"
            alt="Camisetas de fútbol"
            className="w-full rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
        </div>

        <p className="text-lg text-gray-600 mb-6">
          Bienvenidos a [Nombre de la Tienda], tu fuente número uno para las
          mejores camisetas de fútbol. Estamos dedicados a ofrecerte lo mejor en
          ropa deportiva, con un enfoque en la calidad, servicio al cliente y
          exclusividad.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Fundada en [Año de Fundación], [Nombre de la Tienda] ha recorrido un
          largo camino desde sus inicios. Cuando comenzamos, nuestra pasión por
          brindarte las mejores camisetas nos motivó a iniciar nuestro propio
          negocio.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Hoy en día servimos a clientes en todo el país y estamos emocionados
          de ser parte de la industria de la moda deportiva.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Esperamos que disfrutes nuestros productos tanto como nosotros
          disfrutamos ofrecerlos para ti. Si tienes alguna pregunta o
          comentario, no dudes en ponerte en contacto con nosotros.
        </p>
        <p className="text-lg text-gray-600">
          Sinceramente,
          <br />
          [Nombre de la Tienda]
        </p>
      </div>
    </section>
  );
};

export default AboutUs;

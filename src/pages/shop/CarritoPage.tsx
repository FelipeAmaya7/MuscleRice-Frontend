import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function CarritoPage() {
  useEffect(() => {
    // Cuando la página del carrito carga, le decimos a cart.ts que se renderice
    if (typeof (window as any).renderCartPage === 'function') {
      (window as any).renderCartPage();
    }
  }, []);

  return (
    <>
      <style>{`
        .carrito-page-wrapper {
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            color: #222;
        }

        /* Logo y encabezado */
        .carrito-page-wrapper header {
            background-color: white;
            padding: 15px 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3px solid #2ecc71;
        }

        .carrito-page-wrapper .logo {
            width: 140px;
        }

        .carrito-page-wrapper .btn-regresar {
            background-color: #2ecc71;
            padding: 10px 18px;
            border-radius: 8px;
            color: white;
            text-decoration: none;
            font-weight: bold;
        }

        /* Contenedor principal */
        .carrito-page-wrapper .carrito-container {
            width: 90%;
            margin: 30px auto;
            background: #f8f8f8;
            padding: 25px;
            border-radius: 12px;
            border: 2px solid #2ecc71;
        }

        .carrito-page-wrapper h2 {
            color: #2ecc71;
            margin-bottom: 20px;
        }

        /* Producto */
        .carrito-page-wrapper .item {
            display: flex;
            align-items: center;
            background: white;
            padding: 15px;
            border-radius: 12px;
            border: 1px solid #2ecc71;
            margin-bottom: 20px;
        }

        .carrito-page-wrapper .product-img {
            width: 160px;
            height: 160px;
            object-fit: cover;
            border-radius: 12px;
            border: 2px solid #2ecc71;
        }

        .carrito-page-wrapper .item-info {
            flex: 1;
            margin-left: 20px;
        }

        .carrito-page-wrapper .item-info h3 {
            margin: 0;
            font-size: 20px;
        }

        .carrito-page-wrapper .precio {
            font-size: 20px;
            font-weight: bold;
            color: #2ecc71;
        }

        /* Cantidad */
        .carrito-page-wrapper .cantidad-controls {
            display: flex;
            align-items: center;
            margin-top: 10px;
        }

        .carrito-page-wrapper .cantidad-controls button {
            width: 32px;
            height: 32px;
            background: #2ecc71;
            border: none;
            color: white;
            font-size: 20px;
            border-radius: 5px;
            cursor: pointer;
        }

        .carrito-page-wrapper .cantidad-controls span {
            padding: 0 10px;
            font-size: 18px;
        }

        .carrito-page-wrapper .btn-eliminar {
            background-color: #e74c3c;
            padding: 10px 15px;
            border: none;
            color: white;
            border-radius: 8px;
            cursor: pointer;
        }

        /* Resumen */
        .carrito-page-wrapper .resumen {
            background: white;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #2ecc71;
        }

        .carrito-page-wrapper .btn-pagar {
            width: 100%;
            background: #2ecc71;
            padding: 14px;
            border: none;
            font-size: 18px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            cursor: pointer;
        }

        .carrito-page-wrapper .btn-pagar:hover {
            background: #27ae60;
        }
        
        @media (max-width: 600px) {
            .carrito-page-wrapper .item {
                flex-direction: column;
                align-items: flex-start;
            }
            .carrito-page-wrapper .product-img {
                width: 100%;
                height: auto;
                max-height: 260px;
            }
            .carrito-page-wrapper .item-info {
                margin-left: 0;
                margin-top: 10px;
            }
        }
      `}</style>
      
      <div className="carrito-page-wrapper">
        

        <div className="carrito-container">

            <h2>🛒 Tu Carrito</h2>

            {/* Contenido del carrito (se muestra si hay items mediante cart.ts) */}
            <div id="cart-content-wrapper">
                <div id="cart-items-list">
                    {/* Se renderiza dinámicamente con JS (cart.ts) */}
                </div>

                {/* RESUMEN */}
                <div className="resumen" id="cart-summary">
                    <h3>Resumen del pedido</h3>
                    <p>Subtotal: <strong id="cart-subtotal">$0</strong></p>
                    <p>Envío: <strong id="cart-shipping">$5.000</strong></p>
                    <p>Total: <strong id="cart-total">$0</strong></p>

                    <button className="btn-pagar">Proceder al pago</button>
                </div>
            </div>

            {/* Estado vacío (oculto por defecto) */}
            <div id="cart-empty-state" style={{ display: 'none', textAlign: 'center', padding: '50px 20px' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏋️</div>
                <h3 style={{ fontSize: '24px', color: '#00a854', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, marginBottom: '15px' }}>TU CARRITO ESTÁ VACÍO</h3>
                <p style={{ fontSize: '16px', color: '#6c757d', fontFamily: 'Roboto, sans-serif', marginBottom: '30px' }}>¡Empieza a entrenar tu mutación! 🏋️</p>
                <Link to="/productos" className="btn-regresar" style={{ display: 'inline-block' }}>Ver productos</Link>
            </div>

        </div>
      </div>
    </>
  );
}

export default CarritoPage;

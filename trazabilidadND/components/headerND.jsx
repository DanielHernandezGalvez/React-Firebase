// Este código es un componente de React llamado "HeaderND" 
// que muestra la sección de SEO y la carga de CSS y JS de bootstrap.
import { NextSeo } from 'next-seo'
import Script from 'next/script'

export const HeaderND = () => {
    return (
        <>
        
        {/* El componente utiliza la librería NextSEO para establecer la descripción 
        los metadatos OpenGraph y los autores para la página. También carga los archivos CSS y JS de 
        bootstrap mediante el uso de etiquetas link y Script respectivamente. */}
            <NextSeo
                description="This example uses more of the available config options."
                canonical="https://www.canonical.ie/"
                openGraph={{
                    url: 'https://www.url.ie/a',
                    title: 'Open Graph Title',
                    description: 'Open Graph Description',
                    siteName: 'SiteName',
                }}
                authorName={[
                    {
                        name: 'Jane Blogs',
                        url: 'https://example.com',
                    }
                ]}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossOrigin="anonymous"/>
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossOrigin="anonymous" async/>
        </>
    )
}

export default HeaderND

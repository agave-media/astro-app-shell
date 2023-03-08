const generateSchema = () => {
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        "name": "Coatl Race",
        "startDate": "2023-03-12T07:00-05:00",
        "endDate": "2023-03-12T17:00-05:00",
        "inLanguage": "es-MX",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "keywords": ["mtb", "coatl race", "xc texcoco", "enduro", "serial enduro 2023"],
        "sport": "https://en.wikipedia.org/wiki/Enduro_(mountain_biking)",
        "description": "Este evento se lleva a cabo en Monte Tláloc, Estado de México. Una competencia de aproximadamente 22 kilometros y 6 pruebas especiales (3 de ellas completamente nuevas).",
        "location": {
            "@type": "Place",
            "name": "La Pluma de San Pablo Ixayoc, Monte Tláloc",
            "hasMap": "https://goo.gl/maps/TfUV44eLVrxjdWCDA",
            "telephone": "+52 55 7898 0582",
            "publicAccess": true,
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "19.4624655",
                "longitude": "-98.7913189",
                "elevation": "3,000 m"
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "San Pablo Ixayoc",
                "addressLocality": "Texcoco",
                "postalCode": "56249",
                "addressRegion": "Edo. Méx.",
                "addressCountry": "MX"
            }
        },
        "image": [
            "https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/logos%2Fcoatl_race.png?alt=media&token=1ff3d92a-9f01-4ac2-88ee-dce08870d7cc",
            "https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/banners%2Fcoatl_banner.jpg?alt=media&token=be5f14de-22b2-4297-8efb-68ce00756426"
        ],
        "offers": [
            {
                "@type": "Offer",
                "name": "Inscripción - Coatl Race",
                "url": "https://serialmtbtexcoco.com/registro",
                "price": "750",
                "priceCurrency": "MXN",
                "availability": "https://schema.org/InStock",
                "validFrom": "2023-03-12T07:00-05:00"
            },
            {
                "@type": "Offer",
                "name": "Inscripción - Serial Enduro 2023",
                "url": "https://serialmtbtexcoco.com/registro",
                "price": "2700",
                "priceCurrency": "MXN",
                "availability": "https://schema.org/InStock",
                "validFrom": "2023-03-12T07:00-05:00"
            }
        ],
        "organizer": {
            "@type": "Organization",
            "name": "Tláloc Ride Tuned",
            "url": "https://www.facebook.com/taller0tlalocridetuned/"
        },
        "performer": {
            "@type": "Organization",
            "name": "Tláloc Ride Tuned",
            "url": "https://www.facebook.com/taller0tlalocridetuned/"
        },
        "sponsor": {
            "@type": "Organization",
            "name": "Agave Media",
            "url": "https://agavemedia.io/"
        }
    }

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(eventSchema);
    document.head.appendChild(script);
}
generateSchema()

export {}
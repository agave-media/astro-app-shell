const generateSchema = () => {
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        "name": "Reto Tláloc",
        "startDate": "2023-04-23T07:00-05:00",
        "endDate": "2023-04-23T17:00-05:00",
        "inLanguage": "es-MX",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "keywords": ["mtb", "reto tláloc", "xc texcoco", "enduro"],
        "sport": "https://en.wikipedia.org/wiki/Enduro_(mountain_biking)",
        "description": "El Reto Tláloc 4ta Edición se llevará a cabo el próximo 23 de abril en el auditorio ejidal de San Miguel Tlaixpan y contará con tres categorías: avanzado, intermedio y principiante.",
        "location": {
            "@type": "Place",
            "name": "Auditiorio de San Miguel Tlaixpan",
            "hasMap": "https://goo.gl/maps/LNmAVK4wh5kNCZhA9",
            "telephone": "+52 55 7898 0582",
            "publicAccess": true,
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "19.51096955909249",
                "longitude": "-98.81362086189998",
                "elevation": "2,4000 m"
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av Nezahualcóyotl 20",
                "addressLocality": "San Miguel Tlaixpan, Texcoco",
                "postalCode": "56249",
                "addressRegion": "Edo. Méx.",
                "addressCountry": "MX"
            }
        },
        "image": [
            "https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/logos%2Ftlaloc_logo.png?alt=media&token=f168eaec-8e48-4836-bf18-6a673da7e232",
            "https://firebasestorage.googleapis.com/v0/b/serial-mtb-texcoco.appspot.com/o/banners%2Ftlaloc%2Fportada_tlaloc.jpg?alt=media&token=b23e4754-cb1b-485c-b3c2-4a60ac4d9cf9"
        ],
        "offers": [
            {
                "@type": "Offer",
                "name": "Inscripción - Reto Tláloc (Elite)",
                "url": "https://serialmtbtexcoco.com/registro",
                "price": "550",
                "priceCurrency": "MXN",
                "availability": "https://schema.org/InStock",
                "validFrom": "2023-04-23T07:00-05:00"
            },
            {
                "@type": "Offer",
                "name": "Inscripción - Reto Tláloc (Básico)",
                "url": "https://serialmtbtexcoco.com/registro",
                "price": "300",
                "priceCurrency": "MXN",
                "availability": "https://schema.org/InStock",
                "validFrom": "2023-04-23T07:00-05:00"
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
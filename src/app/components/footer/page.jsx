import React from 'react'
import styles from "./footer.module.css"
import Link from 'next/link'

function Footer() {
  const currentYear = new Date().getFullYear();
     const  about= [
        {name: "About GTechSolutions",
href: "/about"
        },
        {name: "Terms & Conditions",
href: "/terms"
        },

    ]

     const   support = [

        {name: "Email",
href: "mailto:authurbass@gmail.com"
        },

    ]

     const   socials = [
        {name: "Facebook",
href: "/"
        },
        {name: "Twitter",
href: "/about"
        },
        {name: "Instagram",
href: "/instagram"
        },
        {name: "TikTok",
href: "/contact"
        },
    ]
  return (
    <div className={styles.footer}>
      
      <div  className={styles.about}>
        <h2>About Us</h2>
        {about.map((item) => (
          <Link key={item.name} href={item.href}>{item.name}</Link>
        ))}
      </div>
      <div className={styles.socials}>
        <h2>Support</h2>
        {socials.map((item) => (
          <Link key={item.name} href={item.href}>{item.name}</Link>
        ))}
      </div>
      <div className={styles.support}>
        <h2>Socials</h2>
        {support.map((item) => (
          <Link key={item.name} href={item.href}>{item.name}</Link>
        ))}
      </div>
      <div className={styles.copyright}>
  <p>&copy; {currentYear} GTechSolutions. All rights reserved.</p>
</div>
      
    </div>
  )
}

export default Footer

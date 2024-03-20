# Euricom Web Security Training

This comprehensive security training covers various aspects of web application security, including the web's security model, OWASP Top 10 risks, defending against XSS attacks, configuring CSP, CSRF prevention, securing cookies, CORS, OAuth 2.0 & OpenID Connect, and implementing secure architectures like BFF. The training will be delivered by Peter Cosemans and Michiel Olijslagers, two experienced security developers from Euricom. Participants will gain a deep understanding of web security concepts, practical mitigation techniques, and best practices for building secure web applications.

## Schedule

* 09:00 - 09:30 - 1. The security model of the Web  (30min)
* 09:30 - 10:00 - 2. OWASP Top 10 Web App Security Risks (30min)
* 10:00 - 10:30 - 3. HTTP Security Headers (30min)
* 10:30 - 10:45 - Break
* 10:45 - 12:00 - 4. Defending against XSS attacks in web apps (60min)
* 12:00 - 13:00 - Lunch
* 13:00 - 14:00 - 5. Shield your apps with a Content Security Policy (60min)
* 14:00 - 15:15 - 6. The insecurity of OAuth 2.0 in frontends (60min)
* 15:15 - 15:30 - Break
* 15:30 - 16:30 - 7. Protecting against Cross-Site Request Forgery (60min)

The following topics will be covered:

### 1. The security model of the Web (30min)

The web is a complex system with many moving parts. In this module, we explore the security model of the web, and how it is enforced by the browser. We also investigate how attackers can bypass the security model.

Key learning goals:
- Understand how browser enforces security
- Understand how attackers threaten modern applications
- Differentiate between origins, sites and domains
- How we can take shared responsibility to secure our applications.

### 2. OWASP Top 10 Web App Security Risks (30min)

The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.

Key learning goals:
- See what we can learn from the OWASP Top 10 Web App Security Risks
- Understands the risks and how to mitigate them

### 3. HTTP Security Headers (30min)

The training provides practical guidance on setting up secure headers in web applications. We explore the different types of headers and how to configure them correctly.

Key learning goals:
- Understand the security headers
- Learn how we can use them to secure our applications

### 4. Defending against XSS attacks in frontend web applications (60min)

The OWASP Top 10 lists XSS as the most common security risk in web applications. In this module, we explore the different types of XSS attacks and how to prevent them.

Key learning goals:
- Understand the different types of XSS attacks and there defenses
- Identify what web frameworks like Angular, React & Vue can and cannot do to prevent XSS
- Learn secure coding practices to prevent XSS in Angular and React
- Learn Trusted Types and how they can prevent XSS in Angular and React
  
### 5. Shield Your App With a Content Security Policy (60min) 

Content Security Policy (CSP) is a powerful browser security mechanism that can prevent XSS attacks. In this module, we explore how CSP works and how to configure it correctly.

Key learning goals:
- Learn what CSP is and how it works
- Learn how to configure CSP to protect against XSS
- Understand how CSP bypass attacks work and can be prevented
- Deploy CSP in modern web applications

### 6. The insecurity of OAuth 2.0 in frontends (60min)

Securing OAuth 2.0 clients in the browser is quite challenging. In this module we investigate how to secure OAuth 2.0 in the browser and highlight the shortcomings of typical security measures such as refresh tokens rotation.

Key Learning goals:
- Identify the danger of malicious javascript code in the frontends.
- Understand the limitations of browser-based OAuth 2.0 clients.
- Learn how to make your web application secure with OAuth 2.0.

### 7. Cross-Site Request Forgery (CSRF) in-depth (60min)

Cross-Site Request Forgery (CSRF) is a common attack that targets authenticated users. In this module, we explore how CSRF works and how to prevent it.

Key learning goals:
- Understands Cross-Site Request Forgery (CSRF) attacks
- Learn how SameSite cookies can prevent CSRF
- Learn how to implement CSRF protection in modern web applications

import React from 'react'
import './Footer.sass'

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__copyright">
                Fully made by Boris Lebedev.
            </div>
            <div className="footer__social">
                <div className="footer__social-single">
                    <a
                        href="https://vk.com/global_mangal"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fa fa-vk"></i>
                    </a>
                </div>
                <div className="footer__social-single">
                    <a
                        href="https://github.com/LebeDEVBoris"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fa fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

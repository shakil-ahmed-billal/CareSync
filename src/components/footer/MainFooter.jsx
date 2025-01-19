import { Footer, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";


const MainFooter = () => {
    return (
        <Footer bgDark className="mt-10">
            <div className="w-full ">
                <div className="grid w-11/12 mx-auto grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
                    <div>
                        <FooterTitle title="Company" />
                        <FooterLinkGroup col>
                            <FooterLink href="#">About</FooterLink>
                            <FooterLink href="#">Careers</FooterLink>
                            <FooterLink href="#">Brand Center</FooterLink>
                            <FooterLink href="#">Blog</FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <FooterTitle title="help center" />
                        <FooterLinkGroup col>
                            <FooterLink href="#">Discord Server</FooterLink>
                            <FooterLink href="#">Twitter</FooterLink>
                            <FooterLink href="#">Facebook</FooterLink>
                            <FooterLink href="#">Contact Us</FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <FooterTitle title="legal" />
                        <FooterLinkGroup col>
                            <FooterLink href="#">Privacy Policy</FooterLink>
                            <FooterLink href="#">Licensing</FooterLink>
                            <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <FooterTitle title="download" />
                        <FooterLinkGroup col>
                            <FooterLink href="#">iOS</FooterLink>
                            <FooterLink href="#">Android</FooterLink>
                            <FooterLink href="#">Windows</FooterLink>
                            <FooterLink href="#">MacOS</FooterLink>
                        </FooterLinkGroup>
                    </div>
                </div>
                <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright href="#" by="CareSync™" year={2025} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FooterIcon href="https://www.linkedin.com/in/shakil-ahmed-billal" icon={BsLinkedin} />
                        <FooterIcon href="https://github.com/shakil-ahmed-billal" icon={BsGithub} />
                        <FooterIcon href="https://www.facebook.com/shakil.ahmed.billal" icon={BsFacebook} />
                        <FooterIcon href="https://xhakil.vercel.app" icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default MainFooter


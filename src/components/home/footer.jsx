function Footer() {
    return (
        <footer className="w-full h-[72px] bg-primary">
            <div className="container flex items-center justify-between text-white p-4">
                <div className="flex items-center space-x-4">
                    <img
                        src="./images/logo.png"
                        alt=""
                    />  
                    <div>
                        <p>© 2022. All rights reserved.</p>
                    </div>
                </div>
                <div>
                    <p>Terms and conditions</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
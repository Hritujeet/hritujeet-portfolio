import React from "react";

const HomeAbout = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
            <div className="card cursor-defualt bg-accent text-accent-content w-auto p-4 transition-all duration-300 hover:scale-105 hover:-rotate-5">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-semibold tracking-tight">Passionate Coder</h2>
                    <p className="font-medium">
                        I am a passionate coder who loves to create
                         innovative solutions. I believe in bulding and shipping things as fast as possible, while maintaining quality and performance.
                    </p>
                </div>
            </div>
            <div className="card cursor-defualt bg-accent text-accent-content w-auto p-4 transition-all duration-300 hover:scale-105">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-semibold tracking-tight">Web Developer</h2>
                    <p className="font-medium">
                        A web developer who enjoys building responsive and user-friendly web applications. I strive to create seamless user experiences through clean and efficient code. I can help you build your next project with modern web technologies.
                    </p>
                </div>
            </div>
            <div className="card cursor-defualt bg-accent text-accent-content w-auto p-4 transition-all duration-300 hover:scale-105 hover:rotate-5">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-semibold tracking-tight">Aspiring Entrepreneur</h2>
                    <p className="font-medium">
                        As an aspiring entrepreneur, I am always looking for new opportunities to innovate and create value. I believe in the power of technology to transform businesses and improve lives.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomeAbout;

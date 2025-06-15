import React from "react";
import "@/app/SkeletonLoader.css"

const SkeletonLoader = ({
                            type = "rectangle",
                            width = "100%",
                            height = "20px",
                            borderRadius = "4px",
                            className = "",
                            count = 1
                        }) => {
    const elements = Array.from({ length: count }, (_, i) => i);

    return (
        <div className={`skeleton-wrapper ${className}`}>
            {elements.map((_, index) => (
                <div
                    key={index}
                    className={`skeleton ${type}`}
                    style={{
                        width,
                        height,
                        borderRadius,
                        animationDelay: `${index * 0.15}s`
                    }}
                />
            ))}
        </div>
    );
};

export default SkeletonLoader;
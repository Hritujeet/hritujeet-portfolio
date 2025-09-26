import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
    return (
        <div className="text-accent">
            loading <Loader className="animate-spin" />{" "}
        </div>
    );
};

export default loading;

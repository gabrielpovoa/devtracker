"use client";

type NotificationProps = {
    message: string;
    type?: "success" | "error";
};

export default function Notification({ message, type = "success" }: NotificationProps) {
    return (
        <div
            className={`
                fixed bottom-5 right-5 
                px-5 py-3 rounded-lg shadow-lg 
                text-white text-sm animate-fade-in 
                ${type === "success" ? "bg-green-600" : "bg-red-600"}
            `}>
            {message}
        </div>
    );
}

const DashboardCard = ({
    title,
    value,
    type
}) => {

    const getIcon = () => {

        switch (type) {

            case "income":
                return "↓";

            case "expense":
                return "↑";

            case "savings":
                return "₹";

            case "investment":
                return "📈";

            case "cashflow":
                return "↔";

            case "percentage":
                return "%";

            default:
                return "₹";
        }
    };


    return (

        <div className={`dashboard-card ${type}`}>

            <div className="dashboard-card-icon">
                {getIcon()}
            </div>

            <div className="dashboard-card-content">

                <span className="dashboard-card-title">
                    {title}
                </span>

                <strong className="dashboard-card-value">

                    {type === "percentage"
                        ? value
                        : `₹${value}`}

                </strong>

            </div>

        </div>
    );
};

export default DashboardCard;
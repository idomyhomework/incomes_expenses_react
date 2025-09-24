import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";

function BudgetChart ({total_income}){
    const data = [
        {name: "Needs (50%) :", value: total_income * 0.5},
        {name: "Wants (30%) :", value: total_income * 0.3},
        {name: "Savings (20%) :", value: total_income * 0.2},
    ];

    const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

    return (
        <div style={{textAlign: "center", margin:"0 auto"}}>
            <h4>50/30/20 Budget Guide</h4>
            <PieChart width={320} height={400}>
                <Pie
                    data={data} cx="50%" cy="50%" outerRadius={100}
                    label = {({name, value}) => `${name}: $${value.toFixed(2)}`} dataKey="value"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                ))}
                </Pie>
                <Tooltip formatter={(value)=> `$${value.toFixed(2)}`}/>    
                <Legend/>
            </PieChart>
        </div>
    );
}

export default BudgetChart;
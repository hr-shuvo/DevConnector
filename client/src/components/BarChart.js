import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const BarChartComponent = ({data}) => {

    return (
        <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data} margin={{top: 50}}>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='date'/>
                <YAxis allowDecimals={false}/>
                <Tooltip contentStyle={{backgroundColor: "#1e1e1e", color: "#ffffff"}}/>
                <Bar dataKey='count' fill='#bef8fd' barSize={75}/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartComponent;
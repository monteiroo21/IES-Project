import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineGraphData {
    name: string;
    values: number[];
}[]

interface LineGraphProps {
    data: LineGraphData[];
    colorMapping: { [key: string]: string };
}


function LineGraph({ data, colorMapping }: LineGraphProps) {

    const now = new Date();

    const transformedData = data[0]?.values.map((_, index) => {
        const point: { [key: string]: number | string } = {
            name: new Date(now.getTime() + (index - data[0]?.values.length + 1) * 60 * 1000)
                .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        data.forEach((item) => {
            point[item.name] = item.values[index];
        });
        return point;
    });


    return (
        <div className="flex flex-col items-center">
            <ResponsiveContainer width="80%" height={400}>
                <LineChart data={transformedData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {data.map((item) => (
                        <Line key={item.name} type="monotone" dataKey={item.name} stroke={colorMapping[item.name]} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineGraph;
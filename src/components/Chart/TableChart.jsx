import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const TableChart = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: analyticInfo } = useQuery({
        queryKey: ['analytics', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/analytics/${user?.email}`)
            return data
        }
    })

    const analytic = [
        { name: 'Reviews', value: analyticInfo?.review },
        { name: 'Register', value: analyticInfo?.register },
        { name: 'Payment', value: analyticInfo?.payment },
        // { name: 'Spend Amount', value: analyticInfo?.totalAmount },
    ];

    // Custom bar shape
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <div>
            <BarChart
                width={500}
                height={300}
                data={analytic} // Transformed from your API
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {analytic.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    );
};

export default TableChart;


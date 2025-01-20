import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartAnalytics = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch analytic data
    const { data: analyticInfo = {}, isLoading, isError } = useQuery({
        queryKey: ['analytics', user?.email],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure(`/analytics/${user?.email}`);
                return data;
            } catch (error) {
                console.error('Error fetching analytics data:', error);
                return {}; // Return empty object on error
            }
        },
    });

    // Guard against loading or error states
    if (isLoading) {
        return <p>Loading data...</p>;
    }

    if (isError || !analyticInfo) {
        return <p>Failed to load analytics data.</p>;
    }

    // Prepare the data for the chart
    const analytic = [
        { name: 'Reviews', value: analyticInfo?.review || 0 },
        { name: 'Register', value: analyticInfo?.register || 0 },
        { name: 'Payment', value: analyticInfo?.payment || 0 },
        // { name: 'Spend Amount', value: analyticInfo?.totalAmount || 0 },
    ];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Legend></Legend>
                    <Pie
                        data={analytic}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {analytic.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartAnalytics;

import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";

import listOfMonths from "../../utils/months";

import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";
import curiousImg from "../../assets/curious.svg";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import { Container, Content } from "./styles";

import { useTheme } from "../../hooks/theme";

const Dashboard: React.FC = () => {
    const { theme } = useTheme();

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: Number(index + 1),
                label: String(month),
            };
        });
    }, []);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach((item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map((year) => {
            return {
                value: Number(year),
                label: String(year),
            };
        });
    }, []);

    const [monthSelected, setMonthSelected] = useState<string>(
        String(new Date().getMonth() + 1)
    );
    const [yearSelected, setYearSelected] = useState<string>(
        String(years[0]["value"])
    );

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach((item) => {
            const date = new Date(item.date);
            const year = String(date.getFullYear());
            const month = String(date.getMonth() + 1);

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error("Invalid amount! Amount must be number");
                }
            }
        });

        return total;
    }, [monthSelected, yearSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach((item) => {
            const date = new Date(item.date);
            const year = String(date.getFullYear());
            const month = String(date.getMonth() + 1);

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error("Invalid amount! Amount must be number");
                }
            }
        });

        return total;
    }, [monthSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        const total = totalGains - totalExpenses;
        return total;
    }, [totalGains, totalExpenses]);

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent:
                    total !== 0
                        ? Number(((totalGains / total) * 100).toFixed(1))
                        : 0,
                color: theme.colors.info,
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent:
                    total !== 0
                        ? Number(((totalExpenses / total) * 100).toFixed(1))
                        : 0,
                color: theme.colors.warning,
            },
        ];

        return data;
    }, [totalGains, totalExpenses, theme.colors]);

    const historyData = useMemo(() => {
        return listOfMonths
            .map((_, month) => {
                let amountEntry = 0;
                gains.forEach((gain) => {
                    const date = new Date(gain.date);
                    const gainMonth = date.getMonth();
                    const gainYear = date.getFullYear();

                    if (
                        gainMonth === month &&
                        String(gainYear) === yearSelected
                    ) {
                        try {
                            amountEntry += Number(gain.amount);
                        } catch {
                            throw new Error(
                                "amountEntry is invalid. amountEntry must be valid number."
                            );
                        }
                    }
                });

                let amountOutput = 0;
                expenses.forEach((expense) => {
                    const date = new Date(expense.date);
                    const expenseMonth = date.getMonth();
                    const expenseYear = date.getFullYear();

                    if (
                        expenseMonth === month &&
                        String(expenseYear) === yearSelected
                    ) {
                        try {
                            amountOutput += Number(expense.amount);
                        } catch {
                            throw new Error(
                                "amountOutput is invalid. amountOutput must be valid number."
                            );
                        }
                    }
                });

                return {
                    monthNumber: Number(month),
                    month: String(listOfMonths[month].substr(0, 3)),
                    amountEntry,
                    amountOutput,
                };
            })
            .filter((item) => {
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();

                return (
                    (Number(yearSelected) === currentYear &&
                        item.monthNumber <= currentMonth) ||
                    Number(yearSelected) < currentYear
                );
            });
    }, [yearSelected]);

    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Neste mês você gastou mais do que deveria.",
                footerText:
                    "Verifique seus gastos e tente cortar algumas coisas desnecessárias",
                icon: sadImg,
            };
        } else if (totalGains === 0 && totalExpenses === 0) {
            return {
                title: "Ops!",
                description:
                    "Neste mês não há registros de entradas ou saídas.",
                footerText:
                    "Parece que você não fez nenhum registro no mês e ano selecionado.",
                icon: curiousImg,
            };
        } else if (totalBalance === 0) {
            return {
                title: "Ufaa!",
                description: "Neste mês você gastou exatamente o que ganhou.",
                footerText:
                    "Tenha cuidado. No próximo mês tente poupar o seu dinheiro.",
                icon: grinningImg,
            };
        } else {
            return {
                title: "Muito bem!",
                description: "Sua carteira está positiva!",
                footerText: "Continue assim. Considere investir o seu saldo.",
                icon: happyImg,
            };
        }
    }, [totalBalance, totalGains, totalExpenses]);

    const relationExpensesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses
            .filter((expense) => {
                const date = new Date(expense.date);
                const month = String(date.getMonth() + 1);
                const year = String(date.getFullYear());

                return month === monthSelected && year === yearSelected;
            })
            .forEach((expense) => {
                if (expense.frequency === "recorrente") {
                    return (amountRecurrent += Number(expense.amount));
                }

                if (expense.frequency === "eventual") {
                    return (amountEventual += Number(expense.amount));
                }
            });

        const total = amountEventual + amountRecurrent;

        return [
            {
                name: "Recorrentes",
                amount: amountRecurrent,
                percent:
                    total !== 0
                        ? Number(((amountRecurrent / total) * 100).toFixed(1))
                        : 0,
                color: theme.colors.info,
            },
            {
                name: "Eventuais",
                amount: amountEventual,
                percent:
                    total !== 0
                        ? Number(((amountEventual / total) * 100).toFixed(1))
                        : 0,
                color: theme.colors.warning,
            },
        ];
    }, [monthSelected, yearSelected, theme.colors]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains
            .filter((gain) => {
                const date = new Date(gain.date);
                const month = String(date.getMonth() + 1);
                const year = String(date.getFullYear());

                return month === monthSelected && year === yearSelected;
            })
            .forEach((gain) => {
                if (gain.frequency === "recorrente") {
                    return (amountRecurrent += Number(gain.amount));
                }

                if (gain.frequency === "eventual") {
                    return (amountEventual += Number(gain.amount));
                }
            });

        const total = amountEventual + amountRecurrent;

        return [
            {
                name: "Recorrentes",
                amount: amountRecurrent,
                percent:
                    total > 0
                        ? Number(((amountRecurrent / total) * 100).toFixed(1))
                        : 0,
                color: theme.colors.info,
            },
            {
                name: "Eventuais",
                amount: amountEventual,
                percent:
                    total > 0
                        ? Number(((amountEventual / total) * 100).toFixed(1))
                        : 0,
                color: theme.colors.warning,
            },
        ];
    }, [monthSelected, yearSelected, theme.colors]);

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor={theme.colors.sucess}>
                <SelectInput
                    options={months}
                    onChange={(e) => setMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />
                <SelectInput
                    options={years}
                    onChange={(e) => setYearSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
            </ContentHeader>
            <Content>
                <WalletBox
                    title="Entradas"
                    amount={totalGains}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                    color={theme.colors.info}
                />

                <WalletBox
                    title="Saídas"
                    amount={totalExpenses}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                    color={theme.colors.warning}
                />

                <WalletBox
                    title="Saldo"
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="dolar"
                    color={theme.colors.sucess}
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartBox data={relationExpensesVersusGains} />

                <HistoryBox
                    data={historyData}
                    lineColorAmountEntry={theme.colors.info}
                    lineColorAmountOutput={theme.colors.warning}
                />

                <BarChartBox
                    title="Saídas"
                    data={relationExpensesRecurrentVersusEventual}
                />

                <BarChartBox
                    title="Entradas"
                    data={relationGainsRecurrentVersusEventual}
                />
            </Content>
        </Container>
    );
};

export default Dashboard;

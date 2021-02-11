import React, { useEffect, useMemo, useState } from "react";
import uuid from "uuid";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import { Container, Content, Filters } from "./styles";

import { useTheme } from "../../hooks/theme";

interface IRouteParams {
    match: {
        params: {
            type: string;
        };
    };
}

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
    const { theme } = useTheme();

    const [data, setData] = useState<IData[]>([]);
    const [frequencyFilterSelected, setSelectedFrequency] = useState<string[]>([
        "recorrente",
        "eventual",
    ]);

    const movimentType = match.params.type;

    const formData = useMemo(() => {
        if (movimentType === "entry-balance") {
            return {
                title: "Entradas",
                lineColor: theme.colors.info,
                listData: gains,
            };
        } else {
            return {
                title: "Saídas",
                lineColor: theme.colors.warning,
                listData: expenses,
            };
        }
    }, [movimentType, theme.colors]);

    const title = formData.title;
    const lineColor = formData.lineColor;
    const listData = formData.listData;

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

        listData.forEach((item) => {
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
    }, [listData]);

    const [monthSelected, setMonthSelected] = useState<string>(
        String(new Date().getMonth() + 1)
    );
    const [yearSelected, setYearSelected] = useState<string>(
        String(years[0]["value"])
    );

    const handleFrequencyClick = (frequency: string = "") => {
        const alreadySelected = frequencyFilterSelected.findIndex(
            (item) => item === frequency
        );

        if (alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(
                (item) => item !== frequency
            );
            setSelectedFrequency(filtered);
        } else {
            setSelectedFrequency((prev) => [...prev, frequency]);
        }
    };

    useEffect(() => {
        const filteredDate = listData.filter((item) => {
            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return (
                month === monthSelected &&
                year === yearSelected &&
                frequencyFilterSelected.includes(item.frequency)
            );
        });

        const formattedData = filteredDate.map((item) => {
            return {
                id: uuid.v4(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor:
                    item.frequency === "recorrente"
                        ? theme.colors.warning
                        : theme.colors.info,
            };
        });

        setData(formattedData);
    }, [
        listData,
        monthSelected,
        yearSelected,
        frequencyFilterSelected,
        theme.colors,
    ]);

    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
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

            <Filters>
                <button
                    type="button"
                    className={`
                        tag-filter tag-filter-recurrent
                        ${
                            frequencyFilterSelected.includes("recorrente") &&
                            "tag-actived"
                        }
                    `}
                    onClick={() => handleFrequencyClick("recorrente")}
                >
                    Recorrentes
                </button>

                <button
                    type="button"
                    className={`
                        tag-filter tag-filter-eventual
                        ${
                            frequencyFilterSelected.includes("eventual") &&
                            "tag-actived"
                        }
                    `}
                    onClick={() => handleFrequencyClick("eventual")}
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {data.map((item) => (
                    <HistoryFinanceCard
                        key={item.id}
                        tagColor={item.tagColor}
                        title={item.description}
                        subtitle={item.dateFormatted}
                        amount={item.amountFormatted}
                    />
                ))}
            </Content>
        </Container>
    );
};

export default List;

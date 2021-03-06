import React, { useContext } from 'react';
import NewSharedPackage from '../shared/NewSharedPackage/NewSharedPackage';
import DashboardProvider, { DashboardContext } from './DashboardProvider/DashboardProvider';
import InfiniteScroll from 'react-infinite-scroller';
import SearchArea from '../shared/SearchArea/SearchArea';
import FormTags from '../shared/FormTags/FormTags';
import Checkbox from '../shared/Checkbox/Checkbox';
import NumberField from '../shared/formFields/NumberField/NumberField';

import './Dashboard.css';

export default function Dashboard(props) {
    return (
        <DashboardProvider loadSize={3} orderBy={['createdBy.createdAt', 'desc']}>
            <DashboardContainer {...props} />
        </DashboardProvider>
    );
}

function DashboardContainer(props) {
    const context = useContext(DashboardContext);
    return (
        <div className="dashboard">
            <SearchArea
                onSubmit={context.onSearch}
                initialValues={{
                    sort: { value: 'created-at_desc', label: `created at-desc` },
                    minCards: 0,
                    minCorrect: 0,
                    maxIncorrect: 100,
                    publicsOnly: false,
                    tags: [],
                }}
                sort={{
                    options: sortOptions(),
                }}
            >
                {({ values, handleChange, handleBlur }: FilterProps<Filters>) => (
                    <div className="filters">
                        <div className="filter-line">
                            <NumberField
                                name="minCards"
                                value={values.minCards}
                                maxValue={100}
                                minValue={0}
                                label="minimum cards number"
                                handleChange={handleChange}
                            />
                            <NumberField
                                name="minCorrect"
                                value={values.minCorrect}
                                maxValue={100}
                                minValue={0}
                                label="minimum correct"
                                handleChange={handleChange}
                            />
                            <NumberField
                                name="maxIncorrect"
                                value={values.maxIncorrect}
                                maxValue={100}
                                minValue={0}
                                label="maximum incorrect:"
                                handleChange={handleChange}
                            />
                            <Checkbox
                                label="Show Publics Only"
                                handleChange={e => {
                                    handleChange({
                                        target: {
                                            name: 'publicsOnly',
                                            value: e.target.checked,
                                        },
                                    });
                                }}
                                name="publicsOnly"
                                id="maxIncorrect"
                                checked={values.publicsOnly}
                            />
                        </div>
                        <FormTags name="tags" tags={values.tags} handleChange={handleChange} />
                    </div>
                )}
            </SearchArea>

            <InfiniteScroll
                pageStart={0}
                loadMore={context.getNextPackages}
                hasMore={context.hasMore}
                loader={
                    <div className="loader" key={0}>
                        Loading ...
                    </div>
                }
            >
                {context.dashboardFlow.length !== 0 ? (
                    context.dashboardFlow.map((element, index) => {
                        return (
                            <NewSharedPackage
                                user={element.user}
                                package={element.package}
                                key={`NewSharedPackage${index}`}
                            />
                        );
                    })
                ) : (
                    <div>There aren't any package shared with you...</div>
                )}
            </InfiniteScroll>
        </div>
    );
}

function sortOptions() {
    return [
        { value: 'created-at_desc', label: `created at-desc` },
        { value: 'created-at_asc', label: `created at-asc` },
        { value: 'name_desc', label: `creator name-desc` },
        { value: 'name_asc', label: `creator name-asc` },
        { value: 'pack-name_desc', label: `package name-desc` },
        { value: 'pack-name_asc', label: `package name-asc` },
        { value: 'cards-number_desc', label: `cards number-desc` },
        { value: 'cards-number_asc', label: `cards number-asc` },
        { value: 'corrects-number_desc', label: `correct cards number-desc` },
        { value: 'corrects-number_asc', label: `correct cards number-asc` },
        { value: 'incorrects-number_desc', label: `incorrect cards number-desc` },
        { value: 'incorrects-number_asc', label: `incorrect cards number-asc` },
    ];
}

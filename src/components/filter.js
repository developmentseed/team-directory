import React, { Component, PropTypes } from 'react';
import { Route } from 'react-router';

export default class Filter extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const { query, filter, sort, sortKeys } = this.props;
    if (query.filter) filter(query.filter);
    if (query.sort) sort(sortKeys.indexOf(query.sort));
  }

  sort(e) {
    const { sort, updatePath, query } = this.props;
    const index = encodeURIComponent(e.target.id);
    const value = encodeURIComponent(e.target.value);
    updatePath(query.filter ? `/?filter=${query.filter}&sort=${value}` : `/?sort=${value}`);
    sort(index);
  }

  filter(e) {
    const { filter, updatePath, query } = this.props;
    const value = encodeURIComponent(e.target.value);
    updatePath(query.sort ? `/?filter=${value}&sort=${query.sort}` : `/?filter=${value}`);
    filter(value);
  }

  render() {
    const { query, sortKeys } = this.props;
    const filterValue = (query.filter) ? decodeURIComponent(query.filter) : '';
    const activeSort = (query.sort) ? query.sort : sortKeys[0];

    return (
      <div className='with-icon space-bottom1'>
        <span className='icon search'></span>
        <input onChange={this.filter.bind(this)} className='col12' placeholder='filter' type='text' value={filterValue} />
        {sortKeys.length && <div className='pin-right pad0x'>
          <form onChange={this.sort.bind(this)} className='rounded-toggle'>
            {sortKeys.map((sort, i) => {
              return (
                <span key={i}>
                  <input id={`${i}`} type='radio' name='sort-toggle' value={`${sort}`} defaultChecked={activeSort === sort} />
                  <label htmlFor={`${i}`} className='animate'>{`${sort}`}</label>
                </span>
              );
            })}
          </form>
        </div>}
      </div>
    );
  }
}

Filter.propTypes = {
  sortKeys: PropTypes.array.isRequired,
  updatePath: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  filter: PropTypes.func.isRequired,
  sort: PropTypes.func
};

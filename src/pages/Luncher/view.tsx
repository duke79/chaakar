/* eslint-disable semi */
/* eslint-disable comma-dangle */
import { FileTextOutlined } from '@ant-design/icons';
import * as React from 'react';
import SearchInput from '../../components/SearchInput';
import useGlobalStyles from '../styles';
import useLauncher from './model';
import useStyles from './styles';

interface LauncherProps {}

const Launcher: React.FC<LauncherProps> = () => {
  const classes = useStyles();
  const styles = useGlobalStyles();
  const {
    filteredHistory,
    historyRefs,
    highlightedIdx,
    query,
    handleSelect,
    handleSearch,
  } = useLauncher();

  const renderHistory = () => {
    return (
      <div className={`${classes.history} ${styles.scrollbar}`}>
        {filteredHistory?.map((el, idx) => (
          <div
            ref={historyRefs[idx]}
            onClick={() => handleSelect(idx)}
            className={`${classes.historyItem} ${
              highlightedIdx === idx ? classes.highlighted : ''
            }`}
          >
            <FileTextOutlined className={classes.listPrefix} />
            {el}
          </div>
        ))}
      </div>
    );
  };

  const renderDetails = () => {
    return (
      <pre className={`${classes.details} ${styles.scrollbar}`}>
        {filteredHistory[highlightedIdx]}
      </pre>
    );
  };

  return (
    <div className={classes.outerBox}>
      <SearchInput onChange={handleSearch} value={query} />
      <div className={classes.container}>
        {renderHistory()}
        {renderDetails()}
      </div>
    </div>
  );
};

export default React.memo(Launcher);

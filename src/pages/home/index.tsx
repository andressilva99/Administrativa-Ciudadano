//  material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//  projects import
import ReportCard from '../../components/cards/statitics/ReportCard';
import HoverSocialCard from '../../components/cards/statitics/HoverSocialCard';
import UserCountCard from '../../components/cards/statitics/UserCountCard';
import ToDoList from '../../sections/home/ToDoList';
import TrafficSources from '../../sections/home/TrafficSources';
import TeamMembers from '../../sections/home/TeamMembers';

// assets
import {
  BarChartOutlined,
  CalendarOutlined,
  ContactsOutlined,
  DownloadOutlined,
  FacebookOutlined,
  FileTextOutlined,
  FileProtectOutlined,
  LinkedinOutlined,
  RedditOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';

const Home = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={3} sm={6}>
        <ReportCard
          primary="$30200"
          secondary="All Earnings"
          color={theme.palette.secondary.main}
          iconPrimary={BarChartOutlined}
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <ReportCard
          primary="145"
          secondary="Task"
          color={theme.palette.error.main}
          iconPrimary={CalendarOutlined}
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <ReportCard
          primary="290+"
          secondary="Page Views"
          color={theme.palette.success.dark}
          iconPrimary={FileTextOutlined}
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <ReportCard
          primary="500"
          secondary="Downloads"
          color={theme.palette.primary.main}
          iconPrimary={DownloadOutlined}
        />
      </Grid>

      {/* row 1 */}
      <Grid item xs={12} lg={4} md={6}>
        <ToDoList />
      </Grid>
      <Grid item xs={12} lg={4} md={6}>
        <TrafficSources />
      </Grid>
      <Grid item xs={12} lg={4} md={12}>
        <TeamMembers />
      </Grid>

      <Grid item xs={12} lg={3} sm={6}>
        <HoverSocialCard
          primary="Facebook Users"
          secondary="1165 +"
          iconPrimary={FacebookOutlined}
          color={theme.palette.primary.main}
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <HoverSocialCard
          primary="Twitter Users"
          secondary="780 +"
          iconPrimary={TwitterOutlined}
          color={theme.palette.info.main}
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <HoverSocialCard
          primary="Linked In Users"
          secondary="998 +"
          iconPrimary={LinkedinOutlined}
          color={
            theme.palette.mode === 'dark'
              ? theme.palette.secondary.lighter
              : theme.palette.secondary.dark
          }
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <HoverSocialCard
          primary="Youtube Videos"
          secondary="650 +"
          iconPrimary={YoutubeOutlined}
          color={theme.palette.error.main}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <UserCountCard
          primary="Daily user"
          secondary="1,658"
          iconPrimary={ContactsOutlined}
          color={theme.palette.success.light}
        />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <UserCountCard
          primary="Daily page view"
          secondary="1K"
          iconPrimary={FileProtectOutlined}
          color={theme.palette.primary.main}
        />
      </Grid>
      <Grid item xs={12} lg={4} sm={6}>
        <UserCountCard
          primary="Last month visitor"
          secondary="5,678"
          iconPrimary={RedditOutlined}
          color={theme.palette.warning.dark}
        />
      </Grid>
    </Grid>
  );
};

export default Home;

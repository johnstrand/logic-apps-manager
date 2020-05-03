import React, { useEffect } from "react";
import { listLogicAppRuns } from "../../lib/api";
import MaterialTable from "material-table";
import useAsync, { AsyncState } from "react-hooks-useasync";
import { parseResourceId, groupBy } from "../../lib/utils";
import { GetApp, Publish, MoreVert } from "@material-ui/icons";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider,
} from "@material-ui/core";

interface Props {
  logicAppName: string | undefined;
}

const Executions = ({ logicAppName }: Props) => {
  const [list, state, getRuns] = useAsync(listLogicAppRuns, {
    runs: [],
    next: null,
  });

  useEffect(() => {
    if (logicAppName) {
      getRuns(logicAppName);
    }
  }, [logicAppName, getRuns]);

  if (!logicAppName) {
    return <div>Select a Logic App from the menu to the left</div>;
  }
  const groupedExecutions = groupBy(
    list.runs,
    (run) => run.properties!.correlation.clientTrackingId
  );

  const executions = Array.from(groupedExecutions.keys()).map(
    (correlationId) => {
      const group = groupedExecutions.get(correlationId)!;
      return {
        runs: group.length,
        succeeded: group.filter((g) => g.properties!.status === "Succeeded")
          .length,
        id: correlationId,
        firstRun: group[0].properties!.startTime,
        lastRun: group[group.length - 1].properties!.startTime,
      };
    }
  );

  return (
    <div style={{ maxWidth: "98%" }}>
      {executions.map((e) => (
        <ExpansionPanel key={e.id}>
          <ExpansionPanelSummary>
            <Typography color="primary">{e.id}</Typography>
            <MoreVert />
            <Typography color="primary">
              {new Date(e.firstRun).toLocaleString("sv-SE")}
            </Typography>
            <MoreVert />
            <Typography>
              {new Date(e.lastRun).toLocaleString("sv-SE")}
            </Typography>
            <MoreVert />
            <Typography
              color={
                groupedExecutions.get(e.id)![0].properties?.status === "Failed"
                  ? "error"
                  : "primary"
              }
            >
              | {e.succeeded} / {e.runs} succeeded
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Status</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedExecutions.get(e.id)!.map((run) => (
                    <TableRow key={run.id}>
                      <TableCell>
                        <GetApp color="primary" />
                        <Publish color="primary" />
                      </TableCell>
                      <TableCell>{run.properties?.status}</TableCell>
                      <TableCell>{run.properties?.startTime}</TableCell>
                      <TableCell>{run.properties?.endTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

export default Executions;

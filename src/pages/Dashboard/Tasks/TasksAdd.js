import { HandleRedirectButton } from './TasksRedirect';
import { AuxContainer, TasksHeader, TasksHeaderButtons } from './TasksStyles';

export function TasksAddMain({ setPageState }) {
  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div>Add task</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'add'} setPageState={setPageState} />
            </div>
          </TasksHeaderButtons>
        </TasksHeader>
      </AuxContainer>
    </>
  );
}

export function TasksAddMobile() {
  return (
    <>
      <div>Add task mobile</div>
    </>
  );
}

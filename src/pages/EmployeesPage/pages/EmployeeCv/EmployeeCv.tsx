import { useEffect, useState } from "react";
import { WrapperDiv, StyledButtonWrapper } from "./EmployeeCv.styles";
import { InfoItem as CvItem } from "@src/components/InfoItem";
import { Outlet, useNavigate, useParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_CVS } from "@graphql/User/User.queries";
import { UnbindCvInput, UnbindCvOutput } from "@graphql/Cv/Cv.interface";
import { UserCvsData } from "./EmployeeCv.types";
import { UNBIND_CV } from "@graphql/Cv/Cv.queries";
import { ROUTE } from "@constants/route";
import { useSearchParams } from "react-router-dom";
import { Loader } from "@components/Loader";
import { InlineError } from "@components/InlineError";
import { AssignCvForm } from "@components/AssignCvForm/AssignCvForm";
import { useModal } from "@hooks/useModal";
import { AssignCvFormProps } from "@components/AssignCvForm/AssignCvForm.types";

export const EmployeeCv = () => {
  const { employeeId } = useParams();
  const { cvId } = useParams();
  const [error, setError] = useState("");
  const [active, setActive] = useState("-1");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [ComponentToRender, openModal] =
    useModal<AssignCvFormProps>(AssignCvForm);

  const {
    data: userData,
    loading,
    refetch,
  } = useQuery<UserCvsData>(GET_USER_CVS, {
    variables: { id: employeeId },

    onError: (err) => {
      setError(err.message);
    },
  });
  
  useEffect(() => {    
    if (!userData) return;

    const firstCv = userData.user.cvs[0];

    if (firstCv && (firstCv.id === cvId || !cvId)) {
      const cvToOpen = searchParams.get("opencv") || firstCv.id;
      navigate(cvToOpen);
      setActive(cvToOpen);
    } else {
      if (cvId) {
        navigate(cvId);
        setActive(cvId);
      }

      setActive("-1");
    }
  }, [userData?.user.cvs, cvId, navigate, searchParams, userData]);

  const [unbindCv] = useMutation<UnbindCvOutput, UnbindCvInput>(UNBIND_CV, {
    onError: (err) => {
      setError(err.message);
    },
    updateQueries: {
      GetUserCvs: (prevResult, options) => {
        if (options.mutationResult.data) {
          const { id } = options.mutationResult.data.unbindCv;
          return {
            user: {
              cvs: prevResult.user?.cvs.filter(
                (cv: { id: string; name: string }) => cv.id !== id,
              ),
            },
          };
        }
        return prevResult;
      },
    },
  });

  const handleActive = (activeId: string) => {
    setActive(activeId);
  };

  const handleCvDelete = (id: string) => {
    if (active === id) {
      navigate(`${ROUTE.EMPLOYEES}/${employeeId}/cv/`);
    } else {
      navigate(`${ROUTE.EMPLOYEES}/${employeeId}/cv?opencv=${active}`);
    }
    unbindCv({
      variables: { id },
      optimisticResponse: {
        unbindCv: {
          id,
        },
      },
    });
  };

  const handleAddIconClick = () => {
    openModal();
  };  

  return (
    <WrapperDiv>
      {loading ? (
        <Loader />
      ) : error ? (
        <InlineError
          message={error}
          tryAgainFn={() => {
            refetch();
          }}
        ></InlineError>
      ) : (
        userData?.user?.cvs && (
          <>
            <div className="sidebar">
              {userData.user?.cvs.map((cv) => {
                return (
                  <div
                    className={active === cv.id ? "active" : ""}
                    key={cv.id}
                    onClick={() => handleActive(cv.id)}
                  >
                    <CvItem
                      name={cv.name}
                      id={cv.id}
                      onDelete={handleCvDelete}
                    />
                  </div>
                );
              })}
              <StyledButtonWrapper onClick={handleAddIconClick}>
                <Button>
                  <AddIcon />
                </Button>
              </StyledButtonWrapper>
            </div>
            {ComponentToRender}
            <Outlet />
          </>
        )
      )}
    </WrapperDiv>
  );
};

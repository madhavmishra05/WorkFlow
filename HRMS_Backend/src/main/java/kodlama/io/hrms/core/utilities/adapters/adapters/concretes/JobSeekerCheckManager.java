package kodlama.io.hrms.core.utilities.adapters.adapters.concretes;

import org.springframework.stereotype.Service;

import kodlama.io.hrms.core.utilities.adapters.adapters.abstracts.JobSeekerCheckService;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.core.utilities.results.SuccessResult;
import kodlama.io.hrms.entities.concretes.JobSeeker;

@Service
public class JobSeekerCheckManager implements JobSeekerCheckService {

    @Override
    public Result checkIfRealPerson(JobSeeker jobSeeker) throws Exception {
        return new SuccessResult("Person is valid");
    }
}
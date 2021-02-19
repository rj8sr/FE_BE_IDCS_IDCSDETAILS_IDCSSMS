package be_idcs_services.application;

import com.liferay.portal.util.PrefsPropsUtil;
import com.pdf.generator.PdfGenerator;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.util.Collections;
import java.util.Properties;
import java.util.Set;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.jaxrs.whiteboard.JaxrsWhiteboardConstants;

@Component(property = { JaxrsWhiteboardConstants.JAX_RS_APPLICATION_BASE + "=/idcsAuth",
		JaxrsWhiteboardConstants.JAX_RS_NAME + "=IdcsAuth.Rest", "auth.verifier.guest.allowed=true",
		"liferay.access.control.disable=true" }, service = Application.class)
public class Be_idcs_servicesApplication extends Application {
	public Set<Object> getSingletons() {
		return Collections.<Object>singleton(this);
	}

	@POST
	@Path("/generateDownload")
	@Produces("application/pdf")
	public Response generateDownload(@QueryParam("idcs") String idcs) throws Exception {
		ResponseBuilder responseBuilder = null;
		
		PdfGenerator.pdfGenerator(idcs);		
		
		File file = new File(PdfGenerator.FILE_PATH+"\\IDCS.pdf");
		
		responseBuilder = Response.ok((Object) file);
		String fileStr = "attachment; filename="+file.getName()+"";
		responseBuilder.header("Content-Disposition",fileStr);
		return responseBuilder.build();
	}

	@POST
	@Path("/getOtp/{idcs}/{telephone}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response generateOtp(@PathParam("idcs") String idcs, @PathParam("telephone") String telephone) {
		ResponseBuilder responseBuilder = null;
		responseBuilder = Response.ok(true);
		return responseBuilder.build();
	}

	@POST
	@Path("/validateOtp/{otp}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response validateOtp(@PathParam("otp") String otp) {
		ResponseBuilder responseBuilder = null;
		boolean isValid = false;
		if (otp.equals("9345")) {
			isValid = true;
		}
		responseBuilder = Response.ok(isValid);
		return responseBuilder.build();
	}

}
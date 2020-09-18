package com.entando.customerportal.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Partner.
 */
@Entity
@Table(name = "partner")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Partner implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "partner_name", nullable = false, unique = true)
    private String partnerName;

    @Column(name = "notes")
    private String notes;

    @OneToOne(mappedBy = "partner")
    @JsonIgnore
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPartnerName() {
        return partnerName;
    }

    public Partner partnerName(String partnerName) {
        this.partnerName = partnerName;
        return this;
    }

    public void setPartnerName(String partnerName) {
        this.partnerName = partnerName;
    }

    public String getNotes() {
        return notes;
    }

    public Partner notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Project getProject() {
        return project;
    }

    public Partner project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Partner)) {
            return false;
        }
        return id != null && id.equals(((Partner) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Partner{" +
            "id=" + getId() +
            ", partnerName='" + getPartnerName() + "'" +
            ", notes='" + getNotes() + "'" +
            "}";
    }
}
